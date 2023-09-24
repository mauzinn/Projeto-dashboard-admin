const Express = require('express')
const table = require('./tables.js')
const bcrypt = require('bcrypt')
const Router = Express.Router()
const jwt = require('jsonwebtoken')
const SECRET = 'SECRET_KEY'


//Midlewares
    async function verificarJWT(req, res, next) {
        let token = req.body.Itoken
        let resposta = {}

        try {
            const tokenExists = jwt.verify(token, SECRET)
        
            if (tokenExists) {
                const accountExists = await table.Contas.findOne({
                    where: {
                        name: tokenExists.name,
                        role: tokenExists.role
                    }
                })

                if (accountExists) {
                    resposta = {
                        result: true,
                        name: tokenExists.name,
                        role: tokenExists.role
                    }

                    req.resposta = resposta
                } else {
                    resposta = {
                        result: false
                    }

                    req.resposta = resposta
                }

                next()
            }
        } catch {
            resposta = {
                result: false
            }

            req.resposta = resposta
            next()
        }
}


//Routes
    //Register
        Router.post('/admin/create', async(req, res) => {
            let name = req.body.inputName
            let password = await bcrypt.hash(req.body.inputPassword, 10)
            let role = req.body.inputRole
            const accountExists = await table.Contas.findOne({
                where: {
                    name: name
                }
            })

            if (!accountExists) {
                table.Contas.create({
                    name: name,
                    password: password,
                    role: role
                }).then(() => {
                    res.json({
                        result: true
                    })
                }).catch(() => {
                    res.json({
                        result: false
                    })
                })
            } else {
                res.json({
                    result: false
                })
            }
        })



    //Login
        Router.post('/admin/compare', async(req, res) => {
            let name = req.body.inputName
            let password = req.body.inputPassword
            const accountExists = await table.Contas.findOne({
                where: {
                    name: name
                }
            })

            if (accountExists) {
                if (await bcrypt.compare(password, accountExists.password)) {
                    let token = jwt.sign({
                        name: accountExists.name,
                        role: accountExists.role
                    }, SECRET, { expiresIn: 86400 })
    
                    res.json({
                        result: true,
                        token: token
                    })
                } else {
                    res.json({
                        result: false
                    })
                }
            } else {
                res.json({
                    result: false
                })
            }
        })


    
    //Criar produto 
        Router.post('/product/create', (req, res) => {
            let name = req.body.product
            let description = req.body.description
            let price = req.body.price

            table.Produtos.create({
                product: name,
                description: description,
                price: price
            }).then(() => {
                res.json({
                    result: true
                })
            }).catch(() => {
                res.json({
                    result: false
                })
            })
        })


    //Puxar produtos
        Router.get('/product/read', (req, res) => {
            table.Produtos.findAll({order: [['ID', 'DESC']]}).then((Products) => {
                res.json({
                    Products
                })
            })
        })

    
    //Deletar produtos
        Router.post('/product/delete', (req, res) => {
            let id = req.body.id

            table.Produtos.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.json({
                    result: true
                })
            }).catch(() => {
                res.json({
                    result: false
                })
            })
        })

        
    //editar preço produtos
        Router.post('/product/edit/price', (req, res) => {
            let id = req.body.id
            let newPrice = req.body.price

            table.Produtos.update({
                price: newPrice
            },
            {
                where: {
                    id: id
                }
            }).then(() => {
                res.json({
                    result: true
                })
            }).catch(() => {
                res.json({
                    result: false
                })
            })
        })


    //Verificar JWT 
        Router.post('/verify/jwt', verificarJWT, async(req, res) => {
            let resposta = req.resposta

            if (resposta) {
                if (resposta.result == true) {
                    res.json(resposta)
                } else {
                    res.json(resposta)
                }
            }
        })







//Exports
    module.exports = Router