const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Record = sequelize.define('record',{

  id:{
    type : Sequelize.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
  },
  amount : {
    type :  Sequelize.INTEGER,
    allowNull : false
  },
  description : {
    type :  Sequelize.STRING,
    allowNull : false,
    unique : true
  },
  });  

module.exports = Record;  