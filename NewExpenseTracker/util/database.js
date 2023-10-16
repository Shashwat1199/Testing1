const Sequelize = require('sequelize');
const sequelize = new Sequelize('new-exp-tracker','root','password',
 {
 dialect : 'mysql',
 host : 'localhost',
 define: {
    timestamps: false
}
});

module.exports = sequelize;
