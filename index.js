
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

  todo: delete logs after they have been added

*/

var fs = require('fs')
var MZeK = require('./lib/mzek')
var fs = require('fs')
var YAML = require('yaml')

// todo: pass in ssb config here too...
// if ssb config does not exist generate a CAP

var file = fs.readFileSync('./mzek.config.yaml', 'utf8')
var config = YAML.parse(file)

var m = MZeK({
  tripwires: config.tripwires,
  logfeeds: config.logfeeds
})

m.start().then(console.log).catch(console.log)
