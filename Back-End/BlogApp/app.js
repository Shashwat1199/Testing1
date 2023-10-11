const path = require('path');
const express = require('express');
const app = express();
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('./models/user');
const Comment = require('./models/comment');
const userRoutes = require('./routes/user')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(userRoutes)

Post.hasMany(Comment,{
    foreignKey : 'postId',
});

sequelize.sync({alter:true})

app.listen(3000);
