const http = require("http")

const config = require("./config")
const SpotifyService = require("./lib/SpotifyService")
const ImageColorExtractor = require("./lib/ImageColorExtractor")
const {mainHandler} = require("./handlers")

const spotifyServiceInstance = new SpotifyService({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  refreshToken: config.refreshToken,
  market: config.market,
})

const imageColorExtractor = new ImageColorExtractor()

const server = http.createServer(mainHandler(spotifyServiceInstance, imageColorExtractor))

server.listen(config.port || 3000)
