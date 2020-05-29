const express= require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app=express();
const bodyPraser= require('body-parser');
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Passport Config
require('./config/passport')(passport);
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(express.static(__dirname+'/images/public/images'));
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Routes
app.use('/', require('./routes/users.js'));
app.use('/', require('./routes/categories.js'));

app.use(bodyPraser.json());


let obj = require('./categories.json');
let obj1 = require('./products.json');

function getGategoryByParent(parentId, products){
    result=[];
    for(i=0; i<products.length;i++){
        if(products[i].parent_category_id==parentId){
            result.push(products[i]);
        }
    }
    return result;
}
var a=getGategoryByParent("womens", obj);
//
function getProductById(productId, products){
    result=[];
    for(i=0; i<products.length;i++){
        if(products[i]._id==productId){
            result.push(products[i]);
        }
    }
    return result;
}


app.listen(69,function(){
    console.log("Server is up to 69.")
});




