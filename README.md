# Crypto Stats API

A simple API to fetch cryptocurrency statistics (price, market cap, 24h change) for Bitcoin, Ethereum, and Matic. The API provides endpoints to get the latest stats for these coins and also implements a background job to fetch data at regular intervals.

## Features
- Fetch the latest cryptocurrency stats using the CoinGecko API.
- Background job that updates the stats for Bitcoin, Ethereum, and Matic every 2 hours.
- API endpoints to get stats for specific cryptocurrencies.
- Standard deviation calculation of historical prices for a requested coin.

## Endpoints
- **GET `/`**: Basic status information of the API.
- **GET `/stats?coin=<coin_name>`**: Fetch the latest stats (price, market cap, 24h change) for a requested cryptocurrency.
- **GET `/deviation?coin=<coin_name>`**: Get the standard deviation of the price for the requested cryptocurrency from the last 100 records stored.

## Setup
```bash
### 1. Clone the repository


git clone <repository_url>
cd <repository_folder>

2. Install dependencies
Make sure you have Node.js and npm installed. Then, run the following command to install the required dependencies:

bash
Copy code
npm install
3. Set up environment variables
Create a .env file in the root directory of your project (not inside src). In this file, add the following environment variables:

env
Copy code
MONGODB_URI=<your_mongodb_connection_url>
PORT=3001  # or any other port you'd like to use
URL=http://localhost:3001  # or the URL of your deployed server
Replace <your_mongodb_connection_url> with your actual MongoDB URI.

4. Running the project
For development, use nodemon to automatically restart the server on code changes. To run the server in development mode, use:

bash
Copy code
npm run dev
For production, you can simply run the following command:

bash
Copy code
npm start
