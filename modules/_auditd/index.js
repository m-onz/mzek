/*
var pull = require('pull-stream')
var client = require('../../lib/client')
var EventEmitter = require('events')
var ev = new EventEmitter

var type = 'auditd'

process.stdin.resume()

process.stdin.on('data', function (d) {
  setTimeout(function() {
    ev.emit(type, d.toString())
  }, 1000)
})

process.stdin.on('error', console.log)

client(function (err, sbot) {
  ev.on('auditd', function (msg) {
    // whitelist msg
    var _msg = msg.trim().split('\n')
    sbot.publish({ type: type, content: _msg }, console.log)
  })
})
*/

module.exports = {
  sudo: true,
  name: 'auditd',
  type: 'bash',
  script: 'tail -f /var/log/audit/audit.log',
  deps: 'apt install -y auditd audispd-plugins',
  module: function () {
    console.log('auditd... loaded')
  }
}
