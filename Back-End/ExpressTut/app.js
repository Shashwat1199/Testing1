const express = require('express');
const app = express();
const path = require('path')
const port = 80;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname,'public'))) //This forwards any request for static .css or .js file to public folder and our navigation will be followed from there


const adminRouter= require('./routes/admin')
const shopRouter= require('./routes/shop')
const contactRouter = require('./routes/contact')
const successRouter = require('./routes/success')

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRouter); 
app.use(shopRouter);
app.use(contactRouter);
app.use(successRouter);


app.use((req,res)=>{
   
    res.status(404).sendFile(path.join(__dirname, 'views','error.html'));
})

app.listen(port,()=>{

    console.log(`This application started successfully on port ${port}`)
}) 

