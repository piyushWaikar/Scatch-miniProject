const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function(req,res,next){
    if(!req.cookies.Token){
        req.flash("error","You need to login first"); // Redirecting this error to / route 
        return res.redirect('/');
    }

    try {
        let decode = jwt.verify(req.cookie.Token, process.env.JWT_KEY);

        let user = await userModel.findOne({email:decode.email}).select("-password"); //  when we call user , we get all the user data including password so to avoid getting password we call select(-password)
        req.user = user; // create user field is req route and set user data -password in it 
        next();
    } catch(err){
        req.flash("Error","Something went wrong");
        res.redirect('/');
    }
};