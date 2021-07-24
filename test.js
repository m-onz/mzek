
/*

run mzek as a non-root user...

allow tcpdump to be run as a non-root user:

  sudo chown tcpdump:tcpdump /usr/sbin/tcpdump
  sudo chmod 755 /usr/sbin/tcpdump
  tcpdump -X
  ll /usr/sbin/tcpdump
  sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump
  sudo ln -s /usr/sbin/tcpdump /usr/local/bin/tcpdump

allow auditd log to be run as a non-root user:

  sudo chown monz -R /var/log/audit/audit
  sudo chgrp monz -R /var/log/audit/audit
*/

var fs = require('fs')
var MZeK = require('.')

// setInterval(function () {
//   fs.appendFileSync('./test_a.log', new Date().toISOString() + '\n')
//   fs.appendFileSync('./test_b.log', new Date().toISOString() + '\n')
// }, 5000)

var tripwires = {
  services: 'systemctl list-units --type service --state running --plain',
  listeningports: 'netstat -lutp'
}

var logfeeds = {
  tcpdump: 'tcpdump -q -i wlp3s0',
  auditd: 'tail -f /var/log/audit/audit.log'
  // testa: 'tail -f ./test_a.log',
  // testb: 'tail -f ./test_b.log'
}

var m = MZeK({
  tripwires,
  logfeeds
})

m.start().then(console.log).catch(console.log)
