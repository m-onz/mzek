
var logFeed = require('.')

var feeds = {
  tcpdump: 'tcpdump -q -i wlp3s0',
  auditd: 'tail -f /var/log/audit/audit.log'
}

var types = Object.keys(feeds)

console.log('available types')
console.log(types)

// logFeed('tcpdump', feeds['tcpdump'])
// logFeed('auditd', feeds['auditd'])

var x = logFeed('auditd', feeds['auditd'])

//x.on('auditd', console.log)
