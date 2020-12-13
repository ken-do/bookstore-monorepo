#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app'
import http from 'http'
import debug from 'debug'
import chalk from 'chalk'

debug('api:server')

interface Error {
    syscall?: string
    code?: string
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT ?? '5000') as string | number
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, function () {
    console.log(
        chalk.blue(`API server is listening at http://localhost:${port}`)
    )
})
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: Error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address()
    const bind =
        typeof addr === 'string'
            ? 'pipe ' + addr
            : `port ${addr?.port as number}`
    debug('Listening on ' + bind)
}
