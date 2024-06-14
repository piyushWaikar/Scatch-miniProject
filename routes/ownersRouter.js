const express = require('express');
const router = express.Router();

const ownerModel = require("../models/owner-model");

router.get('/', (req, res) => {
    res.send("hey")
});

// To set process.env.NODE_ENV to 'development we console in terminal( $env:NODE_ENV="development" ) to create new envionment varaible

// we use this for development in our local machine, when we push this code to production it will not be related to our machine , and also env varaible would be hide inside our local storage
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.send(500).send("Multiple owners are not allowed !");
        }

        let { fullname, email, password } = req.body;
        let createUser = await ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send("Owner Created Successfully : "+ createUser);
    });
}

module.exports = router;