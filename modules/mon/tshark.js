
var dns = require('dns')
var os = require('os')
var forever = require('forever-monitor')
var k = Object.keys(os.networkInterfaces())[1]
var interface = os.networkInterfaces()[k][0]
var my_ip = interface.address
var JSONStream = require('JSONStream')
var es = require('event-stream')
var geoIP = require('offline-geo-from-ip');

var cmd = [
  'tshark',
  '-N',
  'n',
  '-T',
  'fields',
  '-e',
  'ip.src_host',
  '-e',
  'tcp.srcport',
  '-e',
  'ip.dst_host',
  '-e',
  'tcp.dstport',
  '-i',
  k, //'enp2s0f1',
  '-T',
  'json',
  '-q'
]

var hosts = []
var cache = []

var f = forever.start(cmd, {
  max: Infinity,
  silent: true
})

function hostAlreadyAdded (host, port) {
  var exists = false
  hosts.forEach(function (i) {
    if (i.host === host && i.port === port) {
      console.log('host already exists ', host, port)
      exists = true
    }
  })
  return exists
}

f.child.stdout.pipe(JSONStream.parse('*'))
  .pipe(es.map(function (a, cb) {
    var layers = a._source.layers
    var keys = Object.keys(layers)
    Object.values(layers).forEach(function (v, i) {
      if (!v[0].startsWith(my_ip)
      && v[0].includes('.')) {
        var host = layers[keys[i]][0]
        var port = 80
        if (Object.keys(layers).length < 4) return;
        if (keys[i] === 'ip.src_host') {
          port = parseInt(layers['tcp.srcport'][0])
        }
        if (keys[i] === 'ip.dst_host') {
          port = parseInt(layers['tcp.dstport'][0])
        }
        var url = host+':'+port
        if (!cache.includes(url)) {
          cache.push(url)
          dns.lookupService(host, port, function (er, hostname) {
            // console.log(hostname, host, port, geoIP.allData(host))
            var req = {
              hostname: hostname,
              host: host,
              port: port
            }
            hosts.push(Object.assign(geoIP.allData(host), req))
            console.log(hosts)
            cb(null, true)
          })
        } else {
          cb (null, true)
        }
      }
    })
  }))

f.child.stderr.on('data', function (d) {
  console.error(d.toString())
})


// tshark -N n -T fields -e ip.src_host -e tcp.srcport -e ip.dst_host -e tcp.dstport -i enp2s0f1 -T json -q | node tshark.js
