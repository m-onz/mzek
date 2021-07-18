#!/usr/bin/env node

var pull = require('pull-stream')
var client = require('./lib/client')

/*
add minimist
allow filtering by message types
show all message types
*/

/*
message by type
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
*/

// tail all messages
client(function (err, sbot) {
  console.log(err)
  if (err) throw err
  sbot.whoami(console.log)
  pull(sbot.createLogStream({ live: true }), pull.drain(function (msg) {
    if (msg && msg.value && msg.value.hasOwnProperty('content')) console.log(msg.value.content.content.join('\n'))
  }))
})
