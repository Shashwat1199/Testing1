const path = require('path');
const express = require('express');
const app = express();
//const sequelize = require('./util/database')
const bodyParser = require('body-parser');
var cors = require('cors');

const signupRoute = require('./routers/sign-up')
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoute)
  

app.listen(3000,()=>{
    console.log("Server Connected");
});