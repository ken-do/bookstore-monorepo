'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const chalk_1 = __importDefault(require('chalk'))
const cors_1 = __importDefault(require('cors'))
const port = process.env.PORT_API || 5000
function applyMiddlewares(app) {
    app.use(cors_1.default())
    return app
}
function start() {
    const app = express_1.default()
    applyMiddlewares(app)
    app.get('/', function (req, res) {
        res.send({ message: 'Hello World' })
    })
    app.listen(port, function () {
        console.log(
            chalk_1.default.blue(
                `API server is listening at http://localhost:${port}`
            )
        )
    })
}
start()
