const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next) {
    if (!req.cookies.Token) {
        req.flash("error", "You need to login first"); // Redirecting this error to / route 
        return res.redirect('/');
    }else {
        try {
            let decode = jwt.verify(req.cookies.Token, process.env.JWT_KEY); // Fixed typo: req.cookie.Token to req.cookies.Token
            
            let user = await userModel.findOne({ email: decode.email }).select("-password"); // Avoid getting password
            req.user = user; // Set user data without password in req.user
            next();
        } catch (err) {
            console.error(err);
            req.flash("error", "Something went wrong"); // Consistent error key
            res.redirect('/');
        }
    }
};
