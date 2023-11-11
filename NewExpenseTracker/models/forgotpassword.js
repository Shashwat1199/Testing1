const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Forgotpassword = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})

module.exports = Forgotpassword;