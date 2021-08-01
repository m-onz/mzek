
/*
  scuttle-testbot is really useful
  to emulate ssb networks locally
*/
var Testbot = require('scuttle-testbot')
var pull = require('pull-stream')
var crypto = require('crypto')

var Server = (opts) => {
  var stack = Testbot
    .use(require('ssb-replicate'))
    .use(require('ssb-friends'))
    .use({
      name: "debug",
      version: "1.0.1",
      manifest: {},
      init: () => {
        console.log('... ')
        console.log(arguments)
      }
    })
    // .use(require('ssb-private1'))
    // .use(require('ssb-lan'))
    // .use(require('ssb-promiscuous'))
  return stack(opts)
}

var caps = {
  shs: crypto.randomBytes(32).toString('base64')
}

var node1 = Server({ caps })
var node2 = Server({ caps })

Testbot.connect([ node1, node2 ], { friends: true }, function (err) {
  console.log(node1)
  console.log(node2.id)
  setInterval(function () {
    node1.publish({ type: 'test', content: "message"+Math.random() }, console.log)
  }, 5000)
  node1.whoami(console.log)
  node2.whoami(console.log)
  // node1.close() ---> simulate node failure
  // node2.close()
  pull(node1.createLogStream({ live: true }), pull.drain(console.log))
})
