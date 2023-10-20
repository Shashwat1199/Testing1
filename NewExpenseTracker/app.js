const path = require('path');
const express = require('express');
const app = express();
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
var cors = require('cors');

const signupRoute = require('./routers/sign-up')
const signinRoute = require('./routers/sign-in')
const expense = require('./routers/expense')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoute)
app.use(signinRoute)
app.use(expense)

sequelize.sync({ alter : true });

app.listen(3000,()=>{
    console.log("Server Connected");
});
