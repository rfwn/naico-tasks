const fetchOHLCV = require('./fetchOHLCV')
const database = require('./database')
const CandleSchema = require('./database/models/candlestick')
const Server = require('./graphql');

(async () => {
  // Connect to database
  await database.init()

  // Delete existing candles to prevent data conflict
  await candleSchema
    .deleteMany({}, () => {
      console.log('Cleared the database')
    })
    .clone()

  // Fetch new candles
  const [UDST, BNB] = [
    await fetchOHLCV('1m', 'BTCUSDT'),
    await fetchOHLCV('1m', 'BNBBTC')
  ]
  console.log('Fetched data')

  // Having them all in one place
  const candles = [...UDST, ...BNB]

  // Saving to database
  for (const candle of candles) {
    const document = new CandleSchema(candle)
    await document.save()
  }
  console.log('Wrote all candles to database')

  Server.start()
})()
