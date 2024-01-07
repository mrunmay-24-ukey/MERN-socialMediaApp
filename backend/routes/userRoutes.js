const express = require('express')
//* importing controllers

const {signupUser , loginUser , logoutUser , followUnfollowUser , updateUser, getUserProfile} = require('../controllers/userController');
const protectRoute = require('../middlewares/protectRoute');


const router = express.Router();

router.get('/profile/:username' , getUserProfile)
router.post('/signup' , signupUser);
router.post('/login' , loginUser);
router.post('/logout' , logoutUser)
router.post('/follow/:id'  , protectRoute ,   followUnfollowUser);
router.post('/update/:id' , protectRoute , updateUser)

module.exports = router;