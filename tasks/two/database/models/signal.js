const { Schema, model } = require('mongoose')

const signalSchema = Schema({
  signal_number: Number,
  status: String
})

module.exports = model('signals', signalSchema)
