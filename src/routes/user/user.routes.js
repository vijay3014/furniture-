const express = require('express');
const User = express.Router();
const { upload } = require('../../helpers/ImageUpload');
const { registerUser, getAllUser, getUser, logInUser, updateUser, updatePassword, deleteUser } = require('../../controller/user/user.controller');
const { userVerifyToken } = require('../../helpers/userToken/userVerifytoken');

User.post('/registerUser',upload.single('profileImage'),registerUser);
User.get('/getAllUser',upload.none(),getAllUser);
User.post('/logInUser',logInUser);
User.get('/getUser',userVerifyToken,getUser);
// User.put('/updateUser',userVerifyToken,upload.single('profileImage'),updateUser);
User.put('/updateUser',userVerifyToken,updateUser);
User.put('/updateUserPass',userVerifyToken,updatePassword);
User.delete('/deleteUser',userVerifyToken,deleteUser);

module.exports = User;