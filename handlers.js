const {getQueryFromUrl} = require('./utils')

const mainHandler = (spotifyService, imageColorExtractor) => async (req, res) => {
  const data = await spotifyService.getCurrentlyPlaying()

  if (!data) {
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({
      error: true,
      message: 'No activity found'
    }))

    return
  }

  const query = getQueryFromUrl(req.url)
  const colorCount = Number(query.colorCount) | null

  const colors = await imageColorExtractor.extractFromUrl(data.cover, colorCount)

  res.writeHead(200, {"Content-Type": "application/json"})
  res.end(JSON.stringify({
    error: false,
    ...data,
    colors
  }))
}

module.exports = {
  mainHandler
}