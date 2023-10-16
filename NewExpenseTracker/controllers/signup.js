exports.postUser = async(req,res)=>{

    try{
      const name = req.body.name;
      const email = req.body.email; 
      const password = req.body.password;
      //res.status(200).json({newRecordDetail:data});     
    }
    catch(err){
          console.log("Inside error block")
          res.status(500).json({error : err.response.data})
      }
    }