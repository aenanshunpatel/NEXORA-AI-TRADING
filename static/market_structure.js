
function findMarketStructure(candles) {
    const results = [];

    if (!Array.isArray(candles) || candles.length < 7) {
        return results;
    }

    // Swing High અને Swing Low શોધવા
    for (let i = 2; i < candles.length - 2; i++) {
        const current = candles[i];

        const isSwingHigh =
            current.high > candles[i-1].high &&
            current.high > candles[i-2].high &&
            current.high > candles[i+1].high &&
            current.high > candles[i+2].high;

        const isSwingLow =
            current.low < candles[i-1].low &&
            current.low < candles[i-2].low &&
            current.low < candles[i+1].low &&
            current.low < candles[i+2].low;

        if (isSwingHigh) {
            results.push({
                type: "Swing High",
                price: current.high,
                index: i
            });
        }

        if (isSwingLow) {
            results.push({
                type: "Swing Low",
                price: current.low,
                index: i
            });
        }
    }

    return results;
          }
      
