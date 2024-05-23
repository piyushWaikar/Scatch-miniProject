const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const path = require('path');
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = require('./config/mongoose-connect');

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

app.listen(3000);