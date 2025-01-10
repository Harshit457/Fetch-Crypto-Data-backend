const mongoose = require("mongoose")
const cryptoSchema = new mongoose.Schema({
    name: String,
    current_price: Number,
    market_cap: Number,
    change_24h: Number,
    fetched_at: { type: Date, default: Date.now },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports =Crypto;