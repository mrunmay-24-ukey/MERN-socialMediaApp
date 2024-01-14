const User = require("../models/userModels");
const jwt  = require('jsonwebtoken')

const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies.jwt; 
    
        if(!token){
            return res.status.json({message : "Unauthorized"});

        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        req.user = user;

        next();
    } 
    catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in " , error.message);
    }
}


module.exports = protectRoute ;