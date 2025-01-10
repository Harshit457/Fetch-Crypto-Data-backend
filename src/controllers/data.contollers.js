const Crypto = require("../models/crypto.model")

const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Query parameter "coin" is required' });
    }

    try {
        const latestData = await Crypto.findOne({ name: coin.toLowerCase() }).sort({ fetched_at: -1 });
        if (!latestData) {
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        res.json({
            price: latestData.current_price,
            marketcap: latestData.market_cap,
            "24Change": latestData.change_24h,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Query parameter "coin" is required' });
    }

    try {
        // Fetch the last 100 records for the requested cryptocurrency
        const records = await Crypto.find({ name: coin.toLowerCase() })
            .sort({ fetched_at: -1 })
            .limit(100);

        if (records.length === 0) {
            return res.status(404).json({ error: `No data found for ${coin}` });
        }

        // Extract prices
        const prices = records.map(record => record.current_price);

        // Calculate the mean
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Calculate the variance
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        // Calculate the standard deviation
        const standardDeviation = Math.sqrt(variance);

        // Respond with the standard deviation
        res.json({
            deviation: parseFloat(standardDeviation.toFixed(2)), // Round to 2 decimal places
        });
    } catch (error) {
        console.error('Error calculating deviation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { getStats, getDeviation };