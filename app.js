const express = require('express')
const fs = require('fs')
const http = require('http')
const https = require('https')
const app = express()
app.use(express.static('dist')) // absolute or relative to CWD
const SSL = {
  cert: fs.readFileSync(`${__dirname}/ssl/8891e1cda7dbea2b.crt`,'utf8'),
  key: fs.readFileSync(`${__dirname}/ssl/no7.dev.private.key.pem`,'utf8'),
  ca: [fs.readFileSync(`${__dirname}/ssl/gd_bundle_01.crt`,'utf8'),fs.readFileSync(`${__dirname}/ssl/gd_bundle_02.crt`,'utf8'),fs.readFileSync(`${__dirname}/ssl/gd_bundle_03.crt`,'utf8')]
}

const port = 80, sslPort = 443

http.createServer(app).listen(port,() => {
  console.warn(`${port} LISTEN`)
})
https.createServer(SSL, app).listen(sslPort,() => {
  console.warn(`${sslPort} LISTEN`)
})

//app.listen(port, () => console.log(`Listening on port ${port}`))
