const Express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./models/routes.js')
const cors = require('cors')
const app = Express()

//Configuration
    //Body parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //Cors
        app.use(cors({origin: 'http://localhost:8080'}))

//Routes
    app.use(Routes)


    






//Server
    app.listen(1233, () => {
        console.log('- Server rodando na porta http://localhost:1233/')
    })