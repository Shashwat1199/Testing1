const express = require('express');
const app = express();

const port = 80;
const bodyParser = require('body-parser');

const adminRouter= require('./routes/admin')
const shopRouter= require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRouter); 
app.use(shopRouter);

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(port,()=>{

    console.log(`This application started successfully on port ${port}`)
}) 

