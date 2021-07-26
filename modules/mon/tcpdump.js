// tcpdump | node ./tcpdump.js

var uid = parseInt(process.env.SUDO_UID)
if (uid) process.setuid(uid)

var computer = 'mainframe2.lan'

var hosts = []

process.stdin.resume()
process.stdin.on('data', function (d) {
  var rows = d.toString().split('\n')
  rows.forEach(function (r) {
    var d = r.split('>')
    //if (d[0] && d[0].includes(computer)) console.log('TX ', d)
    if (d[1] && d[1].includes(computer)) {
      //console.log('RX ', d[0].split(' ')[0], d[0].split(' ')[1], d[0].split(' ')[2])
      var host = d[0].split(' ')[2]
      if (host && !hosts.includes(host)) hosts.push(d[0].split(' ')[2])
    }
  })
  console.log(hosts)
})
