const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcrypt = require('bcrypt');
const { decrypt } = require('dotenv');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.json({ message: "User already Exist...please try to login." });
        };
        if (req.file) {
            // console.log(req.file);
            // req.body.profileImage = req.file.path.replace('\\', '/');
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashpassword);
        user = await userService.addNewUser({ ...req.body, password: hashpassword });
        return res.json({ message: "New User Registration successful" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "somthing went wrong" });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        let user = await userService.getAllUser({ isAdmin: false, isDelete: false });
        console.log(user);
        if (!user) {
            return res.json({ message: "User is not found..." });
        }
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.json({ message: "somthing went wrong" });
    }
};

exports.getUser = async (req, res) => {
    try {
        let user = req.user;
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({ message: "somthing  went wrong" });
    }
};

exports.logInUser = async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email, isAdmin: false, isDelete: false });
        if (!user) {
            return res.json({ message: "User is not found.." });
        };
        let comparepassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparepassword) {
            return res.json({ message: "Password is not match.Please try again." });
        };
        let payLoad = { userID: user._id };
        let token = jwt.sign(payLoad, 'User');
        console.log(token);
        return res.json({ Token: token, message: "User is Login successfully." });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        let User = await userService.getUserById(req.user._id);
        console.log(User);
        if (!User) {
            return res.json({ message: "User is not found..Please try again" });
        };
        // if (req.file) {
        //     console.log(req.file);
        //     // req.body.profileImage = req.file.path.replace('\\', '/');
        // }
        console.log(req.body.profileImage);
        User = await userService.updateUser(User._id, { ...req.body });
        return res.json({ User, message: "User Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let User = await userService.getUserById(req.user._id);
        console.log(User);
        if (!User) {
            return res.json({ message: "User is not found.." });
        };
        User = await userService.updateUser(req.user._id, { isDelete: true });
        return res.json({ message: "User deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        let User = await userService.getUserById(req.user._id);
        console.log(User);
        if (!User) {
            return res.json({ message: "User is not found.." });
        };
        let comparePass = await bcrypt.compare(req.body.OldPassword, req.user.password);
        let old = req.body.OldPassword;
        if (!old) {
            return res.json({ message: "Old password is not found" });
        };
        if (!comparePass) {
            return res.json({ message: "Old Password is not matched" });
        };
        let New = req.body.NewPassword;
        if (!New) {
            return res.json({ message: "New Password is not found" });
        };
        if (old == New) {
            return res.json({ message: "Old & New Password is same..Please enter diffrent password" });
        };
        let confirm = req.body.ConfirmPassword;
        if (!confirm) {
            return res.json({ message: "Password not Confirmed" });
        };
        if (New !== confirm) {
            return res.json({ message: "New & Confirm Password is not matched." });
        };
        let hashpassword = await bcrypt.hash(confirm, 10);
        User = await userService.updateUser(req.user._id, { password: hashpassword });
        return res.json({ message: "New Password is Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "somthing went wrong" });
    }
};