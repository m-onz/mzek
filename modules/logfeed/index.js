
var logFeed = require('./logFeed.js')

var feeds = {
  tcpdump: 'tcpdump -q -i wlp3s0',
  auditd: 'tail -f /var/log/audit/audit.log',
}

// logFeed('tcpdump', feeds['tcpdump'])
// logFeed('auditd', feeds['auditd'])

var x = logFeed('watch', 'watch ls')

x.on('watch', console.log)
