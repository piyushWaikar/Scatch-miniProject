const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const path = require('path');
app.use(express.static(path.join(__dirname,"public")));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('dotenv').config(); // This is a another mathod to access the .env variables declared anywhere and other is create config file

const db = require('./config/mongoose-connect');

const expressSession = require('express-session');

const flash = require('connect-flash');
// To flash we need to create sessions
app.use(expressSession({
    resave:false, // dont sava again and again if it is not getting saved
    saveUninitialized:false, // Dont create new users session
    // secret:process.env.EXPRESS_SESSION_SECRET
    secret:'secret key'
})
);
app.use(flash()); // flash - by using flash we can create message at any page and can carry that message to next page

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const index = require('./routes/index');

app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);
app.use("/",index);

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err.message);
    res.status(500).send('Something broke!');
});


app.listen(3000);