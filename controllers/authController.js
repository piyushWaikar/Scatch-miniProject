// authController.js
const bcrypt = require('bcrypt');
const { generateTokens } = require('../utils/generateTokens');
const userModel = require('../models/user-model');
const express = require('express');
const router = express.Router();

const registerUsers = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        // Checking if user already have an account
        let user = await userModel.findOne({ email: email });
        if (user) return res.send("You already have an account");
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) return res.send(err.message);
                    else {
                        let user = await userModel.create({
                            fullname,
                            email,
                            password: hash
                        });

                        // Setting cookie for authentication of user using jwt
                        let userToken = generateTokens(user);
                        res.cookie("Token", userToken);
                        // res.render('shop');
                    }
                });
            });
        }
    } catch (err) {
        res.send(err.message);
    }
};

const userLogin = async (req, res) => {
    let { email, password } = req.body;
    
    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("Email and password incorrect");

    bcrypt.compare(password, user.password, function(err, result) {
       
        if (err) {
            return res.status(500).send("Error comparing passwords");
        }
        // if Email & password is right
        if(result){
            let userToken = generateTokens(user);
            res.cookie("Token",userToken);
            res.redirect('/shop');
        }
        // if Email & password is wrong
        else {
            return res.send("Email and password incorrect");
        }
    });
    
}

const logout = (req,res)=>{
    res.cookie("Token","");
    res.redirect('/');
}

module.exports = { registerUsers, userLogin, logout };
