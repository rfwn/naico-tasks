/**
 *
 * @param {OHLVC[]} ohlcv The array of candlesticks
 * @returns Formatetd array of candlesticks
 */
module.exports.parseOHLCV = (ohlcv, symbol) => {
  return ohlcv.map(([timestamp, open, high, low, close, volume]) => ({
    symbol: symbol,
    data: {
      open  : open,
      high  : high,
      low   : low,
      close : close,
      volume: volume,
    },
    timestamp: timestamp,
  }));
};

module.exports.timepresets = {
  "1m" : 60000,
  "5m" : 300000,
  "15m": 900000,
  "30m": 1800000,
  "1h" : 3600000,
  "2h" : 7200000,
  "4h" : 14400000,
  "6h" : 21600000,
  "12h": 43200000,
  "1d" : 86400000,
  "1w" : 604800000,
  "1M" : 2592000000,
  "1y" : 31536000000,
};
