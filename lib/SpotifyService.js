const fetch = require("node-fetch")

const {formUrlEncodedBody, toBase64} = require("../utils")

const BASE_DATA_URL = 'https://api.spotify.com/v1'
const BASE_ACCOUNTS_URL = 'https://accounts.spotify.com/api'

class SpotifyService {
  constructor({ clientId, clientSecret, refreshToken, market }) {
    this.config = {
      clientId,
      clientSecret,
      refreshToken,
      market,
    }
    this.accessToken = null
  }

  getCurrentlyPlaying = async () => {
    const res = await fetch(
      BASE_DATA_URL + '/me/player/currently-playing?market='
      + this.config.market,
      await this.buildAuthReqConf()
    )

    if (res.status !== 200) {
      return null
    }

    const activity = await res.json()

    return {
      name: activity.item.name,
      artist: activity.item.artists[0].name,
      cover: activity.item.album.images[0].url
    }
  }

  refreshToken = async () => {
    const res = await (await fetch(BASE_ACCOUNTS_URL + '/token', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: this.buildAuthHeader(),
        Accept: 'application/json'
      },
      body: formUrlEncodedBody({
        grant_type: 'refresh_token',
        refresh_token: this.config.refreshToken,
      })
    })).json()

    if(res.error){
      return null
    }

    this.accessToken = res.access_token

    return res.access_token
  }

  buildAuthReqConf = async () => ({
    headers: {
      Authorization: `Bearer ${this.accessToken || await this.refreshToken()}`
    }
  })

  buildAuthHeader = () => (
    `Basic ${toBase64(`${this.config.clientId}:${this.config.clientSecret}`)}`
  )
}

module.exports = SpotifyService