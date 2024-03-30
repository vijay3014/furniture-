const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.json({ message: "Admin already Exist..." });
        };
        if (req.file) {
            // console.log(req.file);
            // req.body.profileImage = req.file.path.replace('\\', '/');
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashpassword);
        user = await userService.addNewUser({ ...req.body, password: hashpassword, isAdmin: true });
        return res.json({ message: "New Admin Registration successful" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.getAllAdmin = async (req, res) => {
    try {
        let user = await userService.getAllUser({ isAdmin: true, isDelete: false });
        console.log(user);
        if (!user) {
            return res.json({ message: "Admin is not found.." });
        }
        return res.json({ user });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        let Admin = req.admin;
        console.log(Admin);
        return res.json(Admin);
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
}

exports.logInAdmin = async (req, res) => {
    try {
        let Admin = await userService.getUser({ email: req.body.email, isAdmin: true, isDelete: false });
        if (!Admin) {
            return res.json({ message: "Admin is not found.." });
        };
        let comparepassword = await bcrypt.compare(req.body.password, Admin.password);
        if (!comparepassword) {
            return res.json({ message: "Password is not match.." });
        };
        let payLoad = { adminID: Admin._id };
        let token = jwt.sign(payLoad, "Admin");
        console.log(token);
        return res.json({ Token: token, message: "Admin is Login successfully." });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        let Admin = await userService.getUserById(req.admin._id);
        console.log(Admin);
        if (!Admin) {
            return res.json({ message: "Admin is not found.." });
        };
        // if (req.file) {
        //     // console.log(req.file);
        //     // req.body.profileImage = req.file.path.replace('\\', '/');
        // }
        Admin = await userService.updateUser(req.admin._id, { ...req.body });
        console.log(Admin);
        return res.json({ Admin, message: "Admin Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        let Admin = await userService.getUserById(req.admin._id);
        console.log(Admin);
        if (!Admin) {
            return res.json({ message: "Admin is not found.." });
        };
        Admin = await userService.updateUser(req.admin._id, { isDelete: true });
        return res.json({ message: "Admin deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        let Admin = await userService.getUserById(req.admin._id);
        console.log(Admin);
        if (!Admin) {
            return res.json({ message: "Admin is not found.." });
        };
        let comparePass = await bcrypt.compare(req.body.OldPassword, req.admin.password);
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
            return res.json({ message: "Confirm Password is not found" });
        };
        if (New !== confirm) {
            return res.json({ message: "New & Confirm Password is not matched." });
        };
        let hashpassword = await bcrypt.hash(confirm, 10);
        Admin = await userService.updateUser(req.admin._id, { password: hashpassword });
        return res.json({ message: "New Password is Updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};