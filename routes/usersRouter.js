// userRouter.js
const express = require('express');
const router = express.Router();
const { registerUsers , userLogin } = require('../controllers/authController'); // Ensure correct import

// Model requiring
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
    res.send("hey");
});

router.post('/register', registerUsers);

router.post('/login', userLogin)

module.exports = router;
