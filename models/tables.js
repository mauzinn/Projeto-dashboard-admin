const mySql = require('./sequelize.js')

const Contas = mySql.sequelize.define('contas', {
    name: {
        type: mySql.Sequelize.TEXT
    },
    password: {
        type: mySql.Sequelize.TEXT
    },
    role: {
        type: mySql.Sequelize.TEXT
    }
})

const Produtos = mySql.sequelize.define('produtos', {
    product: {
        type: mySql.Sequelize.TEXT
    },
    description: {
        type: mySql.Sequelize.TEXT
    },
    price: {
        type: mySql.Sequelize.FLOAT
    }
})

module.exports = {
    Produtos: Produtos,
    Contas: Contas
}