
var crypto = require('crypto')

function generateCAP () {
  console.log(crypto.randomBytes(32).toString('base64'))
}

generateCAP()
