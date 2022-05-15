const { Schema, model } = require('mongoose')

const decisionSchema = Schema({
  analyst: String,
  signal_number: Number,
  analyst_decision: String
})

module.exports = model('decisions', decisionSchema)
