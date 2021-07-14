
var fs = require('fs')
var ssbClient = require('ssb-client')
var ssbKeys = require('ssb-keys')
var Config = require('ssb-config/inject')

function Client (cb) {
  function handle () {
    console.log('received SIGINT')
    process.exit(0)
  }
  process.on('SIGINT', handle)
  process.on('SIGTERM', handle)
  var caps = {
    shs: JSON.parse(
      fs.readFileSync(
        __dirname+'/../../config.json'
      ).toString()
    ).cap
  }
  var config = Config('mzek', caps)
  ssbClient(
    config.keys, {
      host: 'localhost',
      port: 8008,
      key: config.keys.id,
      caps: caps
    },
    function (err, sbot, config) {
      if (err) { console.log(err); process.exit(1) }
      cb (null, sbot)
    }
  )
}

module.exports = Client
