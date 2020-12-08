const { exec } = require('child_process')

const installHusky = () => {
    if (!process.env.CI && process.env.NODE_ENV !== 'production') {
        exec('npx husky install')
    }
}

installHusky()
