const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

exports.getUserLeaderBoard = async(req,res) => {

    try{
        const leaderboardofusers = await User.findAll({
           
            group : ['user.id'],
            order: [['total_expense', 'DESC']]
        });                

        leaderboardofusers.sort((a,b) => b.total_cost - a.total_cost)
        res.status(200).json({leaderboardofusers})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

exports.downloadExpense = async(req,res) => {

    try{
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const leaderboardofusers = await User.findAll({
           
            group : ['user.id'],
            order: [['total_expense', 'DESC']]
        });                

        leaderboardofusers.sort((a,b) => b.total_cost - a.total_cost)
        res.status(200).json({leaderboardofusers})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

