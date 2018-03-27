const mongoose = require('mongoose')

const username = 'doogiefletch',
      password = 'godougs',
      address = '@ds223509.mlab.com:23509/wigglerton'

function connect() {
  let url = "mongodb://" + username + ":" + password + address
  mongoose.connect(url)
}

connect()

function disconnect() {
  mongoose.disconnect()
}

module.exports = connect
