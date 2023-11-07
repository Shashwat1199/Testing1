const User = require('../models/users');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');

exports.getUserLeaderBoard = async(req,res) => {

    try{
        const leaderboardofusers = await User.findAll({
            attributes : ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')),'total_cost']],
            include : [
                {
                    model : Expense,
                    attributes:[]
                }
            ],
            group : ['user.id'],
            order: [['total_cost', 'DESC']]
        });
                 

        leaderboardofusers.sort((a,b) => b.total_cost - a.total_cost)
        res.status(200).json({leaderboardofusers})
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}
