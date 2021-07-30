// tshark -N n -T fields -e ip.src_host -e tcp.srcport -e ip.dst_host -e tcp.dstport -i enp2s0f1 -T json -q | node tshark.js

var JSONStream = require('JSONStream')
var es = require('event-stream')
var os = require('os')
var dns = require('dns')

var k = Object.keys(os.networkInterfaces())[1]
var interface = os.networkInterfaces()[k][0]
var my_ip = interface.address

console.log(my_ip)

var remote_hosts = []

var uid = parseInt(process.env.SUDO_UID)
if (uid) process.setuid(uid)
//console.log('running as ', process.getuid())

process.stdin.pipe(JSONStream.parse('*'))
  .pipe(es.mapSync(function (a) {
    var layers = a._source.layers
    console.log('.. ', layers, ' ..')
    // if (layers.hasOwnProperty('ip.src_host') &&
    //     layers.hasOwnProperty('tcp.srcport')
    // ) {
    //   var src_host = layers['ip.src_host'][0]
    //   var src_port = layers['tcp.srcport'][0]
    //   if (src_host &&
    //     my_ip !== src_host &&
    //     !remote_hosts.includes(src_host)) {
    //       dns.lookupService(src_host, parseInt(src_port), function (er, hostname) {
    //        if (!er) remote_hosts.push({ hostname: hostname, ip: src_host, port: src_port })
    //          else remote_hosts.push({ hostname: null, ip: src_host, port: src_port })
    //       })
    //     }
    // }
    // if (layers.hasOwnProperty('ip.dst_host') &&
    //     layers.hasOwnProperty('tcp.dstport')
    // ) {
    //   var dst_host = layers['ip.dst_host'][0]
    //   var dst_port = layers['tcp.dstport'][0]
    //   if (dst_host &&
    //     my_ip !== dst_host &&
    //    !remote_hosts.includes(dst_host)) {
    //      dns.lookupService(dst_host, parseInt(dst_port), function (er, hostname) {
    //       if (!er) remote_hosts.push({ hostname: hostname, ip: dst_host, port: dst_port })
    //         else remote_hosts.push({ hostname: null, ip: dst_host, port: dst_port })
    //      })
    //    }
    // }
    // console.log(remote_hosts)
}))
