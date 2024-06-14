const mongoose = require('mongoose');
const config = require('config'); // we are using config instead of .env , according to seryian config is better .

const debug = require('debug')('development:mongoose'); // require('debug')("Anything:Anything") , we can see from where the console.log is comming . This does not work until you set envionment variable . In console ($env:DEBUG = 'development:*') means show all Development related messages. when you dont want to use this (set DEBUG= ).  


mongoose.connect(`${config.get("MONGODB_URI")}/scatch`).then(function () {
        debug("Connected");
    })
    .catch(function (err) {
        debug(err.message);
    });

module.exports = mongoose.connection;