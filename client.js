#!/usr/bin/env node

var fs = require('fs')
var pull = require('pull-stream')
var client = require('./lib/client')
var YAML = require('yaml')
var argv = require('minimist')(process.argv.slice(2))
var file = fs.readFileSync('./mzek.config.yaml', 'utf8')
var config = YAML.parse(file)

var type = 'ALL'
if (argv.type) type = argv.type

if (!config.ssb.cap) throw Error('needs a cap')

if (type === 'ALL') {
  client(config.ssb.cap, function (err, sbot) {
    if (err) throw err
    pull(
      sbot.createLogStream({ live: true }),
      pull.drain(function (msg) {
        if (msg) console.log(JSON.stringify(msg, void 0, 2))
    }))
  })
} else {
  client(config.ssb.cap, function (err, sbot) {
    if (err) throw err
    pull(
      sbot.messagesByType({ live: true, reverse: true, type: type }),
      pull.drain(function (msg, _) {
        if (msg) console.log(JSON.stringify(msg, void 0, 2))
      })
    )
  })
}
