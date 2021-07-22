
var pull = require('pull-stream')
var client = require('../../lib/client')
var EventEmitter = require('events')
var spawn = require('child_process').spawn
var runcmd = require('../../lib/runcmd')

function tripWire (type, command) {
  var ev = new EventEmitter
  var cmd = command.split(' ')
  // watch with -g will close if the output changes
  var ls = spawn(`watch`, ['-g', cmd[0], ...cmd.slice(1, cmd.length) ])
  ls.stdout.on('data', function (data) {})
  ls.stderr.on('data', function (data) {})
  ls.on('error', function (err) {
    console.log(err)
    throw err
  })
  ls.on('close', function (code) {
    // test if watch has exited and send the command output to the feed
    console.log('should exit')
    runcmd.Exec(command,
      function (e, r) {
        if (e) return cb(e)
        r.message = 'Detected a change in this commands output'
        ev.emit(type, r)
      })
    // respawn
    ls = spawn(cmd[0], cmd.slice(1, cmd.length))
  })
  client(function (err, sbot) {
    ev.on(type, function (msg) {
      sbot.publish({ type: type, content: msg }, function(){})
    })
  })
  return ev
}

module.exports = tripWire
