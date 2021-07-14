
var util = require('.')

console.log(util)

var sys_info = [
  'cat /etc/hostname',
  'cat /proc/cpuinfo',
  'cat /proc/meminfo',
  'ip addr'
]

util.combineRunExec(sys_info).then(console.log).catch(console.log)
