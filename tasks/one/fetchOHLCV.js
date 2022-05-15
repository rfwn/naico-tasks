// Dependecies & Initialization
const ccxt = require('ccxt')
const binance = new ccxt.binance()
const { timepresets, parseOHLCV } = require('./util')
/**
 * Returns the last 4000 candlesticks based on the interval
 * @param {string} interval
 * @param {string} symbol
 * @returns {Promise<Array<Object>>}
 */
module.exports = async (interval, symbol) => {
  const candles = []
  for (let i = 0; i < 4; i++) {
    const data = await binance.fetchOHLCV(
      symbol,
      interval,
      Date.now() - (4000 - candles.length) * timepresets[interval],
      1000
    )
    candles.push(...parseOHLCV(data, symbol))
  }
  return candles
}
