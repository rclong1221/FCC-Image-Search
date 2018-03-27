const mongoose = require('mongoose')
const Schema = mongoose.Schema

const db = require('../../lib/db.js')

var imageSchema = new Schema({
  query: {type: String, unique: true}
}, {timestamps: true})

var Image = mongoose.model('image', imageSchema)

module.exports = Image
