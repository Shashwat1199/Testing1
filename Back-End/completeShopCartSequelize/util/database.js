const Sequelize = require('sequelize');
const sequelize = new Sequelize('back-end','root','password',
 {
 dialect : 'mysql',
 host : 'localhost'
});

module.exports = sequelize;

