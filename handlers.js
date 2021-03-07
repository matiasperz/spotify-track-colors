const mainHandler = (spotifyService, imageColorExtractor) => async (req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(404)
    res.end()
  }

  const data = await spotifyService.getCurrentlyPlaying()
  if (!data) {
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({
      error: true,
      message: 'No activity found'
    }))
  }
  
  const colors = await imageColorExtractor.extractFromUrl(data.cover)

  res.writeHead(200, {"Content-Type": "application/json"})
  res.end(JSON.stringify({
    ...data,
    colors
  }))
}

module.exports = {
  mainHandler
}