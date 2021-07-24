#!/usr/bin/env node

console.log('<mzek> mzek server.')

var os = require('os')

if (os.platform()!=='linux') throw Error(`
  mzek only currently supports debian linux!
  sorry!
`);

var Server = require('ssb-server')
var pull = require('pull-stream')
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var Config = require('ssb-config/inject')
//var mzekNode = require('./modules/node')

// ~/.mzek
var config = Config('mzek', {
  caps: {
    shs: JSON.parse(
          fs.readFileSync(__dirname+'/config.json').toString()
        ).cap
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
      console.log('... ')
      console.log(arguments)
    }
  })

var server = Server(config)

var manifest = server.getManifest()
fs.writeFileSync(
  path.join(config.path, 'manifest.json'),
  JSON.stringify(manifest)
)
/*
setTimeout(function () {
  mzekNode(function (e, msg) {
    if (e) throw e;
    console.log('... ', JSON.stringify(msg.value.content, null, 2))
  })
}, 30000)
*/
// server.whoami(console.log)
pull(server.createLogStream({ live: true }), pull.drain(function (d) {
  console.log(JSON.stringify(d, void 0, 2))
}))
