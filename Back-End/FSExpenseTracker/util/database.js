const Sequelize = require('sequelize');
const sequelize = new Sequelize('back-end','root','password',
 {
 dialect : 'mysql',
 host : 'localhost',
 define: {
    timestamps: false
}
});

module.exports = sequelize;

