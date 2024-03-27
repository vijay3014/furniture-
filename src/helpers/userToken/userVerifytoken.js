const jwt = require('jsonwebtoken');
const User = require('../../model/user.model');

exports.userVerifyToken = async (req, res, next) => {
    try {
        const authorized = req.headers['authorization'];
        if (typeof authorized !== 'undefined') {
            let token = authorized.split(" ")[1];
            // console.log("Token is => ",token);
            const { userID } = jwt.verify(token, 'User');
            // console.log("userId is here => ",userID);
            req.user = await User.findOne({ _id: userID, isDelete: false });
            // console.log("req.user is here => ",req.user);
            req.user ? next() : res.json({ message: 'Invalid user' });  // if else statment
        } else {
            res.json({ message: "Token is Invalid OR token is not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: 'Internal Server Error "From verifyToken"' });
    }
};