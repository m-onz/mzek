#!/usr/bin/env node

console.log('<mzek> mzek server.')

var os = require('os')

if (os.platform()!=='linux') throw Error(`
  mzek only currently tested on linux
`);

var DEBUG = false
var WAIT_TIME = 3000; // wait for the server to spin up
var Server = require('ssb-server')
var pull = require('pull-stream')
var YAML = require('yaml')
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var Config = require('ssb-config/inject')
var MZeK = require('./lib/mzek')

var file = fs.readFileSync('./mzek.config.yaml', 'utf8')
var _config = YAML.parse(file)

// ~/.mzek
var config = Config('mzek', {
  caps: {
    shs: _config.ssb.cap
  }
})

Server
  .use(require('ssb-master'))
  .use(require('ssb-gossip'))
  .use(require('ssb-replicate'))
  .use(require('ssb-friends'))
  .use(require('ssb-conn'))
  .use(require('ssb-lan'))
  .use(require('ssb-promiscuous'))
  .use({
    name: "debug",
    version: "1.0.1",
    manifest: {},
    init: () => {
      // console.log('... ')
      // console.log(arguments)
    }
  })

var server = Server(config)

var manifest = server.getManifest()
fs.writeFileSync(
  path.join(config.path, 'manifest.json'),
  JSON.stringify(manifest)
)

setTimeout(() => {
  var file = fs.readFileSync('./mzek.config.yaml', 'utf8')
  var config = YAML.parse(file)
  var m = MZeK({
    tripwires: config.tripwires,
    logfeeds: config.logfeeds,
    cap: config.ssb.cap
  })
  m.start().then(console.log).catch(console.log)
}, WAIT_TIME);

if (DEBUG) {
  server.whoami(console.log)
  pull(server.createLogStream({ live: true }), pull.drain(function (d) {
    console.log(JSON.stringify(d, void 0, 2))
  }))
}
