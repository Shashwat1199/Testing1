const path = require('path');
const express = require('express');
const app = express();
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
var cors = require('cors');
const Post = require('./models/user');
const Comment = require('./models/comment');
const userRoutes = require('./routes/user')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

try{
    app.use((req, res, next) =>{
        console.log("running Middleware");
        Post.findByPk(1, {raw : true}).then((post) =>{
            req.post = post;
            console.log("Look Here>>>>>>>" + req.post);
            next();
        });    
    });
    }
catch(err){
        console.log(err.response.data)
}

app.use(userRoutes)


Post.hasMany(Comment);
Comment.belongsTo(Post,{
    constraints : true
}); 

sequelize.sync()  //Use force true if 'field id No default value error throws'
.then(result => {
   
})
.catch(err =>{
    console.log(err);
})

app.listen(3000);
