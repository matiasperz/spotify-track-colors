const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const colorThief = require('colorthief')
const onecolor = require('onecolor')

const IMAGE_DIR = path.resolve(__dirname, '../temp/image.jpg')
const DEFAULT_COLOR_COUNT = 2

class ImageColorExtractor {
  constructor() {}

  extractFromUrl = async (url, colorCount) => {
    const imageDir = await this.downloadImage(url)
    const rgbColors = await this.extractColors(imageDir, colorCount)

    return rgbColors
  }

  extractColors = async (imageDir, colorCount) => {
    const rgbColors = await colorThief.getPalette(imageDir, colorCount | DEFAULT_COLOR_COUNT)
    const hexColors = rgbColors.map((rgb) => onecolor(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`).hex())

    return hexColors
  }

  downloadImage = (url) => new Promise((resolve, reject) => {
    fetch(url)
    .then(res => 
      res.body.pipe(
        fs.createWriteStream(IMAGE_DIR)
      ).on('close', () => resolve(IMAGE_DIR))
    ).catch((err) => {
      reject(err)
    })
  })
}

module.exports = ImageColorExtractor
