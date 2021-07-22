
var pull = require('pull-stream')
var client = require('../../lib/client')
var EventEmitter = require('events')
var spawn = require('child_process').spawn

function logFeed (type, command) {
  var ev = new EventEmitter
  var cmd = command.split(' ')
  var ls = spawn(cmd[0], cmd.slice(1, cmd.length))
  ls.stdout.on('data', function (data) {
    ev.emit(type, data.toString())
  })
  ls.stderr.on('data', function (data) {
    ev.emit(type, data.toString())
  })
  ls.on('error', function (err) {
    throw err
  })
  ls.on('close', function (code) {
    throw Error('stream closed early')
  })
  client(function (err, sbot) {
    ev.on(type, function (msg) {
      var _msg = msg.trim().split('\n')
      sbot.publish({ type: type, content: _msg }, function(){})
    })
  })
  return ev
}

module.exports = logFeed
