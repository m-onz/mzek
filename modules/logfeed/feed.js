
var pull = require('pull-stream')
var client = require('../../lib/client')

var input = process.argv.slice(2)
if (input.length) input = input[0]
  else throw Error('needs a message type')
var type = input

client(function (err, sbot) {
  if (err) throw err
  pull(
    sbot.messagesByType({ live: true, reverse: true, type: type }),
    pull.drain(function (msg, _) {
      console.log(msg, _)
      // if (msg && msg.hasOwnProperty('value')) {
      //   console.log(msg.value.content.content.join('\n'))
      // }
    })
  )
})
