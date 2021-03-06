const { Schema, model } = require('mongoose')

const CandleSchema = Schema({
  symbol: String,
  data: {
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number
  },
  timestamp: Number
})

module.exports = model('Candlesticks', CandleSchema)
