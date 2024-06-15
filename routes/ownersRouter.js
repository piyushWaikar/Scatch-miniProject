const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

// Middleware to parse JSON body
router.use(express.json());

router.get('/', (req, res) => {
    res.send("hey");
});

// Set process.env.NODE_ENV to 'development' for local development
// To create a new environment variable in the terminal, use:
// $env:NODE_ENV="development"
// We use this for development on our local machine. When we push this code to production, 
// it will not be related to our machine, and also environment variables will be hidden inside our local storage.

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(500).send("Multiple owners are not allowed!");
            }

            let { fullname, email, password } = req.body;
            let createUser = await ownerModel.create({
                fullname,
                email,
                password
            });
            res.status(201).send("Owner Created Successfully: " + createUser);
        } catch (error) {
            res.status(500).send("Error creating owner: " + error.message);
        }
    });
}

router.get('/admin', (req, res) => {
    let success = req.flash("success"); // Fetching success message
    res.render("createproducts", { success });
});

module.exports = router;
