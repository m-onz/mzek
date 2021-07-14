
var fs = require('fs')
var crypto = require('crypto')

function generateConfig () {
  fs.writeFileSync(process.cwd()+'/config.json', JSON.stringify({
    cap: crypto.randomBytes(32).toString('base64')
  }))
}

module.exports = generateConfig
