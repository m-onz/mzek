
var pull = require('pull-stream')
var client = require('../lib/client')

/*

live feed of tail -f /var/log/audit/audit.log

*/

var type = 'auditd'

client(function (err, sbot) {
  console.log(err)
  if (err) throw err
  pull(
    sbot.messagesByType({ live: true, reverse: true, type: type }),
    pull.drain(function (msg, _) {
      if (msg && msg.hasOwnProperty('value')) console.log(msg.value.content.content.join('\n'))
    })
  )
})
