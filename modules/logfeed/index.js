
var pull = require('pull-stream')
var client = require('../../lib/client')
var { EventEmitter } = require('events')
var forever = require('forever-monitor')

function logFeed (cap, type, command) {
  var ev = new EventEmitter
  var child = forever.start(command.split(' '), {
    max: Infinity,
    silent: true
  })
  child.child.stdout.on('data', function (data) {
    ev.emit(type, data.toString())
  })
  child.child.stderr.on('data', function (data) {
    ev.emit(type, data.toString())
  })
  client(cap, function (err, sbot) {
    ev.on(type, function (msg) {
      var _msg = msg.trim().split('\n')
      sbot.publish({ type: type, content: _msg }, function(){})
    })
  })
  return ev
}

module.exports = logFeed
