//* importing models 
const User = require('../models/userModels')
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/helpers/generateTokenAndSetCookie');

const signupUser = async (req , res) => {
    try{
        const {name , email , username , password} = req.body;

        //* check if user already exists 
        const user = await User.findOne({$or:[{email} , {username}]});

        if(user){
            return res.status(400).json({error:"User already exists"})
        }

        //* hashing password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword,

        })
        await newUser.save();

        if(newUser){

            generateTokenAndSetCookie(newUser._id , res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            })
        }
        else{
            res.status(400).json({message : 'Invalid user data'});
        }
        
    }
    catch(error){
        res.status(500).json({error : error.message})
        console.log("Error in signup User" , error.message)
    }
}


const loginUser = async (req , res) => {
    try {

        const {username , password}  =req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({message : "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id , res)
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        })
        
    } catch (error) {
        res.status(500).json({error : error.message})
        console.log("Error in login User" , error.message)
    }
}


const logoutUser = (req , res) => {
    try {
        //* delete cookie
        res.cookie('jwt' , {maxAge: 1});
        res.status(200).json({message : "User logged out successfully"});
        
    } catch (error) {
        res.status(500).json({error : error.message})
        console.log("Error in logout User" , error.message)
    }
}


const followUnfollowUser = async (req , res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        if(id === req.user._id.toString()) return res.status(400).json({message:"You cannot follow/unfollow yourself"})

        if(!userToModify || !currentUser) return res.status(400).json({message : 'User not found'});


        //* Toggleing the state follow to undfollow to unfollow to follow
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            //* unfollow
            //^ modify current user following , modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id , {$pull : {following : id}});

            await User.findByIdAndUpdate(id , {$pull : {followers : req.user._id}});
            res.status(200).json({message: "User unfollowed successfully"})


        }
        else{
            //* Follow user
            await User.findByIdAndUpdate( req.user._id , {$push : {following : id}})
            await User.findByIdAndUpdate(id , {$push : {followers : req.user._id}})
            res.status(200).json({message: "User followed successfully"})

        }
        
    } catch (error) {
        res.status(500).json({error : error.message})
        console.log("Error in logout User" , error.message)
    }
}

const updateUser = async (req , res) => {
    const {name , email , username , password, profilePic , bio} = req.body;
    const userId = req.user._id;
    try {
        let user = User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"})

        if(req.params.id != userId.toString()) return res.status(400).json({message: 'You cannot  update others profile'});

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password , salt);
            user.password = hashedPassword;

        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username|| user.username;
        user.profilePic = profilePic|| user.profilePic;
        user.bio = bio|| user.bio;

        user = await user.save();
        res.status(200).json({message : "Profile updated successfully" , user })

    } 
    catch (error) {
        res.status.json({error : error.message})
        console.log("Error in updateUser" , error.message);
        
    }
    
}

const getUserProfile = async (req , res) => {
    try {
        const user = await User.findOne({username}).select('-password').select('-updatedAt');
        if(!user) return res.status(400).json({message : "User not found"});
        res.status(200).json(user);

    } 
    catch (error) {
        res.status(500).json({error : error.message})
        console.log("Error in getting profile" , error.message);
    }
}



module.exports = {signupUser , loginUser , logoutUser , followUnfollowUser , updateUser , getUserProfile , };
