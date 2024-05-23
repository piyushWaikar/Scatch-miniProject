const mongoose = require('mongoose');

mongoose
    .connect("mongodb://127.0.0.1:27017/scatchUser")
    .then(function(){
        console.log("Connected");
    })
    .catch(function (err) {
        console.log(err.message);
    });

    module.exports = mongoose.connection;