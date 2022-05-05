const fetchOHLCV = require("./fetchOHLCV"),
  database = require("./database"),
  candleSchema = require("./database/models/candlestick");

(async () => {
  await database.init();

  await candleSchema
    .deleteMany({}, () => {
      console.log("Cleared the database");
    })
    .clone();

  const [UDST, BNB] = [
    await fetchOHLCV("1m", "BTCUSDT"),
    await fetchOHLCV("1m", "BNBBTC"),
  ];
  console.log("Fetched data");

  const candles = [...UDST, ...BNB];

  for (const candle of candles) {
    const document = new candleSchema(candle);
    await document.save();
  }
  console.log("Wrote all candles to database");
})();
