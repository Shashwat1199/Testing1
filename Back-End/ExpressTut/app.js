const express = require('express');
const app = express();
const port = 80;

app.use((req, res, next) =>{
   console.log("This is first middleware");
   next();
});

app.use((req, res, next) =>{
    console.log("This is another middleware");
 });

app.listen(port,()=>{

    console.log(`This application started successfully on port ${port}`)
}) 

