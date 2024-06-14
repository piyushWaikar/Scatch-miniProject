const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/',function(req,res){
    let error = req.flash("error"); // accepting the flash error from isLoggedIn.js on / route .
    res.render(index , {error});
});

router.get('/shop',isLoggedIn, (req,res)=>{
    res.render('shop');
});

module.exports = router;

