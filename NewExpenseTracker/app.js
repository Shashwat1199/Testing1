const path = require('path');
const express = require('express');
const app = express();
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
var cors = require('cors');
const Expense = require("./models/expenses");
const User = require("./models/users");
const Order = require("./models/orders");
const Forgotpassword = require('./models/forgotpassword');
const userRoute = require('./routers/user')
const expense = require('./routers/expense')
const purchase = require('./routers/purchase')
const resetPasswordRoutes = require('./routers/resetpassword.js')

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoute)
app.use(expense)
app.use(purchase)
app.use(resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync({ alter : true });

app.listen(3000,()=>{
    console.log("Server Connected");
});
