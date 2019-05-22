const express = require('express')
const compression = require('compression')

const app = express()
const port = 8088

app.use(compression())
app.use(express.static('./dist'))

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './dist' })
})

app.listen(port)

console.log(`Port: ${port}`)
