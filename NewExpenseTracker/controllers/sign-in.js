const User = require('../models/sign-up');

exports.postUser = async(req, res)=>
{
let email = req.body.email;

const emailexists = await User.findone({ where: { email: email } });
 if (emailexists) {
    console.log("Email exists");
    res.json("email already registered")
 }
}