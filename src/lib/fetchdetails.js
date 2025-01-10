const Crypto = require("../models/crypto.model")
const axios = require("axios")
const fetchCryptoData = async  ()=> {
    try {
        const url = process.env.URL;
        const response = await axios.get(url, {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,matic-network',
            },
        });

        const cryptos = response.data.map(crypto => ({
            name: crypto.id,
            current_price: crypto.current_price,
            market_cap: crypto.market_cap,
            change_24h: crypto.price_change_percentage_24h,
        }));

        // Insert fetched data into the database
        await Crypto.insertMany(cryptos);
        console.log('Crypto data saved:', cryptos);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}
module.exports = fetchCryptoData;
