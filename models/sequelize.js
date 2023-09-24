const Sequelize = require('sequelize')

const sequelize = new Sequelize('admin', 'root', 'YOUR_PASSWORD', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}