
var pull = require('pull-stream')
var client = require('../../lib/client')
var { EventEmitter } = require('events')
var forever = require('forever-monitor')
var runcmd = require('../../lib/runcmd')

function tripWire (cap, type, command) {
  var ev = new EventEmitter
  // console.log('command ', [ 'watch', '-g' ].concat(command.split(' ')))
  var child = forever.start(
    [ 'watch', '-g' ].concat(command.split(' ')
  ), {
    max: Infinity,
    silent: true
  })
  child.on('restart', function () {
    runcmd.Exec(command,
      function (e, r) {
        if (e) return cb(e)
        r.message = 'Detected a change in this commands output'
        ev.emit(type, r)
      })
  })
  client(cap, function (err, sbot) {
    ev.on(type, function (msg) {
      sbot.publish({ type: type, content: msg }, function(){})
    })
  })
  return ev
}

module.exports = tripWire
