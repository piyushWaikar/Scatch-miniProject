const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post('/create', upload.single("image"), async function (req, res) {
    try {
        let { price, name, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            price,  // Added price field
            name,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        req.flash("success","Product added Successfully");
        res.redirect("/owners/admin");
        
    } catch (error) {
        res.status(500).send({ error: 'Error creating product', details: error.message });
    }
});

module.exports = router;
