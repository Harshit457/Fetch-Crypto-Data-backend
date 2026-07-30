const express = require("express")

const {getStats ,getDeviation } =require("../controllers/data.contollers")

const router = express.Router();
router.get("/",(req, res) => {
    const jsonResponse = {
        message: 'Welcome to the Crypto Stats API!',
        status: 'Server is running',
        documentation: 'Visit /stats to get the latest cryptocurrency data (Bitcoin, Ethereum, Matic-Network).',
        note: 'For more information, visit the API documentation.'
    };
    res.json(jsonResponse);  // Return the response as JSON
})
router.get("/stats",getStats);
router.get("/deviation",getDeviation)
module.exports = router;
