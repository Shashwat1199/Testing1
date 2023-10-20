const Expense = require('../models/expense');

exports.getExpense = async(req,res,next)=>{   
  try{
      const expenses = await Expense.findAll();      
      res.status(200).json({allExpenses:expenses});
  }
  catch(error){
      console.log("Didn't hit "+ error);
  }
};
  
exports.postExpense = async(req,res)=>{

  try{
    const amount = req.body.amount;
    const description = req.body.description; 
    const category = req.body.category; 
    try{
    const data = await Expense.create({amount : amount, description : description, category : category})
    res.status(200).json({newExpenseDetail:data}); 
    }
    catch(err){
        console.log("Here is the error>>>>>>" + err);
    }
       
  }
  catch(err){
        console.log(">>>>>>>>Inside error block")
        res.status(500).json({error : err.response.data}) 
    }
  }

 exports.deleteExpense = async(req,res)=>{
    try{
     const uID = req.params.id;
     await Expense.destroy({where : {id : uID}});
     res.sendStatus(200);
 }
 catch(err)
{
  console.log(err);
}
}