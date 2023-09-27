const path = require('path');
const rootDir = require('../util/path')

exports.getcontact = (req, res, next) =>{
    
    res.sendFile(path.join(rootDir,'views/contact.html'))
}

exports.postcontact = (req,res,next)=>{
    console.log(req.body)
    res.redirect('/success');
 }