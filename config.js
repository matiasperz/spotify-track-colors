require('dotenv').config()

module.exports = {
  env: process.env.ENV,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  market: process.env.MARKET,
}