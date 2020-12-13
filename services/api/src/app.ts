import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/users'

interface Error {
    message: string
    status: number
}

function applyMiddlewares(app: Express) {
    app.use(cors())
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))
    return app
}

function applyRoutes(app: Express) {
    app.use('/', indexRouter)
    app.use('/users', usersRouter)
}

const app = express()

applyMiddlewares(app)

applyRoutes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
// eslint-disable-next-line promise/prefer-await-to-callbacks
app.use(function (err: Error, req: Request, res: Response) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status ?? 500)
    res.render('error')
})

export default app
