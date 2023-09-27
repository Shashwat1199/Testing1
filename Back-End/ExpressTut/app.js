const express = require('express');
const app = express();
const path = require('path')
const port = 80;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,'public'))) //This forwards any request for static .css or .js file to public folder and our navigation will be followed from there


const admin = require('./routes/admin')
const shop = require('./routes/shop')
const contact = require('./routes/contact')
const success = require('./routes/success')

const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended:false}));

app.use(admin); 
app.use(shop);
app.use(contact);
app.use(success);

app.use(errorController.get404)

app.listen(port,()=>{

    console.log(`This application started successfully on port ${port}`)
}) 

