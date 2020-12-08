import express, { Express } from 'express'
import chalk from 'chalk'
import cors from 'cors'

const port = process.env.PORT_API || 5000

function applyMiddlewares(app: Express) {
    app.use(cors())
    return app
}

function start() {
    const app = express()

    applyMiddlewares(app)

    app.get('/', function (req, res) {
        res.send({ message: 'Hello World' })
    })

    app.listen(port, function () {
        console.log(
            chalk.blue(`API server is listening at http://localhost:${port}`)
        )
    })
}

start()
