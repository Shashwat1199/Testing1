const fs = require('fs');
const express  = require('express')
const app = express();
const port = 80;
const bodyparser = require('body-parser')
const router = express.Router();

app.use(bodyparser.urlencoded({extended:false}));

app.get("/", (req,res) => {

    res.send(`<form action = "/login" method = "POST" onSubmit = "document.getElementById('username').value = localStorage.setItem('username')">
   
   <input type="text"  name="username" id = "username" >
   <button type="submit">Login</button></form>`)
   res.redirect('/message')
})

app.get("/message", (req,res)=>{

    fs.readFile('username.txt',(err, data)=>{
    if(err){
     console.log(err);
     data = 'No chat exists';
    }     
     res.send(`${data}
       <form action = "/login" method = "POST" onSubmit = "document.getElementById('message').value = localStorage.setItem('message')">
       
       <input type="text" name="message" id = "message">
       <input type="hidden" name="username" id = "username">
       <button type="submit">Send</button></form>`)
   })
 });

app.post("/login", (req,res,err)=>{

    console.log(req.body.username);
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`,{flag:'a'},(err)=>
    err? console.log(err) : res.redirect("/message"));
});
 
app.listen(port,(req,res)=>{
    console.log("Server started")
});