
/*

  mzek node.

    grabs some basic information about the computer
    creates an unique node ID
    adds this info to the feed with the message type 'once'
    checks the feed first to make sure it hasn't been run already

*/

var os = require('os')
var crypto = require('crypto')
var pull = require('pull-stream')
var client = require('../../lib/client')

var type = 'node'

function genNodeInfo () {
  var errors = false
  try {
    var node = {
      name: os.hostname()+':'+os.type()+':'+os.arch(),
      id: crypto.randomBytes(32).toString('base64'),
      network: os.networkInterfaces(),
      endanness: os.endianness(),
      platform: os.platform(),
      hostname: os.hostname(),
      homedir: os.homedir(),
      user: os.userInfo(),
      tmpdir: os.tmpdir(),
      arch: os.arch(),
      type: os.type(),
      env: process.env,
      cpus: os.cpus()
    }
  } catch (e) { errors = e; }
  return new Promise(function (resolve, reject) {
    if (!errors) resolve(node)
      else reject(errors)
  })
}

module.exports = function (cb) {
  client(function (err, sbot) {
    pull(
      sbot.messagesByType({ type: type }),
      pull.collect(function (e, msgs) {
        if (e) return cb(e)
        if (!msgs.length) {
          genNodeInfo ().then(function (info) {
            sbot.publish({ type: type, content: info }, cb)
          }).catch(cb)
        } else { cb(null, msgs[0]); }
        setTimeout(function () { sbot.close() }, 1000)
      })
    )
  })
}
