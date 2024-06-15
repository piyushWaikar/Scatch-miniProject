const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

// Root route
router.get('/', function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

// Shop route
router.get('/shop',isLoggedIn, async (req, res) => {
    try {
        let products = await productModel.find();        
        res.render("shop", {products});
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load products. Please try again later.");
        res.redirect('/');
    }
});

module.exports = router;
