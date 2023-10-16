exports.postUser = async(req,res)=>{

    try{
      const name = req.body.name;
      const email = req.body.email; 
      const password = req.body.password;
    
      console.log(name);
      try{
      const data = await User.create({name : name, email : email ,password : password})
      }
      catch(err){
        console.log("This is error");
      }

      res.status(200).json({newUserDetail:data});     
    }

    catch(err){
          console.log("Inside error block")
          res.status(500).json({error : err.response.data})
      }
    }