const express = require('express');
const app = express();
const port = 80;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(req, res, next) =>{
    
    res.send('<form action = "/product" method = "POST"><input type = "text" name = "title"><br><input type = "number" name = "quantity"><button type ="submit">Add Product</button></form>')
 });

 app.use('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/');
 })

 app.use('/',(req,res,next)=>{
    res.send('<h3>Hello From NodeJS</h3>');
 });

app.listen(port,()=>{

    console.log(`This application started successfully on port ${port}`)
}) 

