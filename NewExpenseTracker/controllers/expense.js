const Sequelize  = require('sequelize');
const Expense = require('../models/expenses');
const User = require('../models/users');
const sequelize = require('../util/database')

exports.getExpense = async(req,res,next)=>{   
  try{
      const expenses = await Expense.findAll({where :{userId: req.user.id}});      
      res.status(200).json({allExpenses:expenses});
  }
  catch(error){
      console.log("Didn't hit-"+ error);
  }
};

exports.postExpense = async(req,res)=>{

  try{
    const t = await sequelize.transaction();
    
    const amount = req.body.amount;
    const description = req.body.description; 
    const category = req.body.category; 
    var totalExpense;
    totalExpense += amount;
    try{
    const data = await Expense.create({amount : amount, description : description, category : category, userId:req.user.id},{transaction:t})
    const totalExpense = req.user.total_expense + Number(amount);
    //console.log("Here it is >>>> " + totalExpense)
    const result = await User.update({
      total_expense : totalExpense
    },{
      where :{id:req.user.id},
      transaction : t
    })

    await t.commit()   
    res.status(200).json({newExpenseDetail:data}); 
    }
    catch(err){
        await t.rollback();
        console.log("Here is the error>>>>>> " + err);
    }       
  }
  catch(err){
        await t.rollback();
        console.log(">>>>>>>>Inside error block" + err)
        //res.status(500).json({error : err.response.data}) 
    }
  }

 exports.deleteExpense = async(req,res)=>{
    try{
     const eID = req.params.expenseid;
     console.log("This is scoming in req>>>> " + req.user);
     const result = await Expense.destroy({where : {id : eID, userId: req.user.id}});
//      const totalExpense = req.user.total_expense - Number(amount);
//     //console.log("Here it is >>>> " + totalExpense)
//     const resultt = await User.update({
//       total_expense : totalExpense
//     },{
//       where :{id:req.user.id},
//       //transaction : t
//     })
//      console.log("Async >>> " + result);
//      res.sendStatus(200);
  }
 catch(err)
{
  console.log(err);
}
}