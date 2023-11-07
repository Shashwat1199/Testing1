const Expense = require('../models/expenses');
const User = require('../models/users');

exports.getExpense = async(req,res,next)=>{   
  try{
      const expenses = await Expense.findAll({where :{userId: req.user.id}});      
      res.status(200).json({allExpenses:expenses});
  }
  catch(error){
      console.log("Didn't hit-"+ error);
  }
};
//let total_expense = 0;  
exports.postExpense = async(req,res)=>{

  try{
    const amount = req.body.amount;
    const description = req.body.description; 
    const category = req.body.category; 
    var totalExpense;
    totalExpense += amount;
    try{
    //console.log("User ID is coming>>> " + req.user.id);  
    const data = await Expense.create({amount : amount, description : description, category : category, userId:req.user.id})
    const totalExpense = req.user.total_expense + Number(amount);
    console.log("Here it is >>>> " + totalExpense)
    const result = await User.update({
      total_expense : totalExpense
    },{
      where :{id:req.user.id}
    }
    )   
    res.status(200).json({newExpenseDetail:data}); 
    }
    catch(err){
        console.log("Here is the error>>>>>> " + err);
    }       
  }
  catch(err){
        console.log(">>>>>>>>Inside error block" + err)
        //res.status(500).json({error : err.response.data}) 
    }
  }

 exports.deleteExpense = async(req,res)=>{
    try{
     const eID = req.params.expenseid;
     const result = await Expense.destroy({where : {id : eID, userId: req.user.id}});
     console.log("Async >>> " + result);
     res.sendStatus(200);
 }
 catch(err)
{
  console.log(err);
}
}