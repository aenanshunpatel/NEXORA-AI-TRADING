
function findMarketStructure(candles) {
    const results = [];

    if (!Array.isArray(candles) || candles.length < 7) {
        return results;
    }

    const swings = [];

    // Find Swing Highs and Swing Lows
    for (let i = 2; i < candles.length - 2; i++) {
        const current = candles[i];

        const isSwingHigh =
            current.high > candles[i - 1].high &&
            current.high > candles[i - 2].high &&
            current.high > candles[i + 1].high &&
            current.high > candles[i + 2].high;

        const isSwingLow =
            current.low < candles[i - 1].low &&
            current.low < candles[i - 2].low &&
            current.low < candles[i + 1].low &&
            current.low < candles[i + 2].low;

        if (isSwingHigh) {
            swings.push({
                type: "HIGH",
                price: current.high,
                index: i
            });
        }

        if (isSwingLow) {
            swings.push({
                type: "LOW",
                price: current.low,
                index: i
            });
        }
    }

    let previousHigh = null;
    let previousLow = null;

    for (const swing of swings) {
        if (swing.type === "HIGH") {
            let label = "Swing High";

            if (previousHigh !== null) {
                label = swing.price > previousHigh
                    ? "HH"
                    : "LH";
            }

            results.push({
                type: label,
                price: swing.price,
                index: swing.index
            });

            previousHigh = swing.price;
        }

        if (swing.type === "LOW") {
            let label = "Swing Low";

            if (previousLow !== null) {
                label = swing.price > previousLow
                    ? "HL"
                    : "LL";
            }

            results.push({
                type: label,
                price: swing.price,
                index: swing.index
            });

            previousLow = swing.price;
        }
    }

    return results;
}

// Make function available to other scripts
window.findMarketStructure = findMarketStructure;
                
