const dotenv = require("dotenv")
const express = require("express")
const Routes = require("./routes/routes")
const connectDB = require("./lib/db")
const fetchCryptoData = require("./lib/fetchdetails")
const cron = require('node-cron');
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/",Routes);
cron.schedule('0 */2 * * *', () => {  
    console.log('Running scheduled crypto fetch job at:', new Date());
    fetchCryptoData();
});
app.listen(PORT,()=>{
    console.log("Server is running on PORT:" + PORT);
    connectDB()
    fetchCryptoData()
})

