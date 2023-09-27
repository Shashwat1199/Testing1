const path = require('path');
const rootDir = require('../util/path')

 exports.get404 = (req,res)=>{
    console.log("Inside error page")
    res.status(404).sendFile(path.join(rootDir, 'views/error.html'));
}