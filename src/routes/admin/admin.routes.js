const express = require('express');
const Admin = express.Router();
const { upload } = require('../../helpers/ImageUpload');
const { adminVerifyToken } = require('../../helpers/adminToken/adminVerifytoken');
const { registerAdmin, getAllAdmin, logInAdmin, updateAdmin, deleteAdmin, updatePassword, getAdmin } = require('../../controller/admin/admin.controller');

Admin.post('/registerAdmin', upload.single('profileImage'), registerAdmin);
Admin.get('/getAllAdmin', getAllAdmin);
Admin.get('/getAdmin', adminVerifyToken, getAdmin);
Admin.post('/logInAdmin', logInAdmin);
Admin.put('/updateAdmin', adminVerifyToken,upload.single('profileImage'), updateAdmin);
Admin.put('/updateAdminPass', adminVerifyToken, updatePassword);
Admin.delete('/deleteAdmin', adminVerifyToken, deleteAdmin);

module.exports = Admin;