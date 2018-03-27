const express = require('express')
const app = express()

const PORT = 5000

app.set("port", process.env.port || PORT)

var server = app.listen(app.get("port"), function () {
  console.log(`Server is running on port ${server.address().port}...`)
})
