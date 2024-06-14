

const jwt = require('jsonwebtoken');


const generateTokens = (user)=>{
    return jwt.sign({ email: user.email, id:user._id }, process.env.JWT_KEY); // Instead of writing direct key ("SECRET KEY") we are setting environment variable for secrurity purpose
};

module.exports.generateTokens = generateTokens; // Exporting function