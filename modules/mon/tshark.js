// sudo tshark -i enp2s0f1 -T json -q | node index.js

var JSONStream = require('JSONStream')
var es = require('event-stream')

var uid = parseInt(process.env.SUDO_UID)
if (uid) process.setuid(uid)
//console.log('running as ', process.getuid())

process.stdin.pipe(JSONStream.parse('*'))
  .pipe(es.mapSync(function (a) { console.log(JSON.stringify(a, null, 2)); }))

