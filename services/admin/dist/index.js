const express = require('express')
const { join } = require('path')
const app = express()

app.use(express.static(join(__dirname, '..', 'build')))

app.get('*', function (req, res) {
    res.sendFile(join(__dirname, '..', 'build', 'index.html'))
})

const port = process.env.PORT_WEB || 8082

app.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
    console.log(`Server listening on PORT: ${port}`)
})
