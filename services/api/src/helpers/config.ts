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

const port = normalizePort(process.env.PORT ?? '5000') as string | number

export const BASE_URL = `http://localhost:${port}`
export const JSON_DB_NAME =
    process.env.NODE_ENV === 'test' ? 'bookstore-db-test' : 'bookstore-db'
