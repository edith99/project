const express= require("express");
const app = express();
const router= express.Router();
const request=require('request');
const bodyPraser= require('body-parser');

app.set('view engine', 'ejs'); 
app.use(bodyPraser.json());

let obj = require('../categories.json');
let obj1 = require('../products.json');

app.use(express.static(__dirname+'/images/public/images'));

router.get('/home', function (request,response) {

    response.render('home',{
        genderId: request.params.genderId,
        categvar: obj,
    });
});

router.get('/cart/:genderId/:categoryId/:productId', function (request,response) {

    response.render('cart',{
        productId:request.params.productId,
        genderId: request.params.genderId,
        categoryId: request.params.categoryId,
        categvar: obj,
        prodvar: obj1
    });
});

router.get('/home/:genderId',function(request,response){
   
    response.render('categories',{
        genderId: request.params.genderId,
        categvar: obj,
       
    });
});

router.get('/home/:genderId/:categoryId',function(request,response){
    
    response.render('subcategories',{
        genderId: request.params.genderId,
        categoryId: request.params.categoryId,
        categvar: obj
    });
});

router.get('/home/:genderId/:categoryId/:productId',function(request,response){
    
    response.render('products',{
        productId:request.params.productId,
        genderId: request.params.genderId,
        categoryId: request.params.categoryId,
        categvar: obj,
        prodvar: obj1
    });
});


module.exports = router;