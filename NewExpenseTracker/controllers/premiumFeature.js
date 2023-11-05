const User = require('../models/users');
const Expense = require('../models/expenses');

exports.getUserLeaderBoard = async(req,res) => {

    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userAggregatedExpenses = {}
        expenses.forEach((expense) => {
            
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] = userAggregatedExpenses[expense.userId] + expense.amount;
            }
            else{
                userAggregatedExpenses[expense.userId] = expense.amount
            }
        }); 
        console.log(userAggregatedExpenses);
        //res.status(200).json({userAggregatedExpenses})

        var userLeaderBoardDetails = [];
        users.forEach((user)=>{
                //console.log("Check this>>>>>>" + userLeaderBoardDetails);
                
                userLeaderBoardDetails.push({name : user.name, total_cost : userAggregatedExpenses[user.id] || 0})
        })
        console.log("Check this>>>>>>" + userLeaderBoardDetails);
        res.status(200).json({userLeaderBoardDetails})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// module.exports = {
//     getUserLeaderBoard
// }