
var TripWire = require('./tripWire.js')

var tripWires = {
  services: 'systemctl list-units --type service --state running --plain',
  listeningports: 'ss -tulpn'
}

var types = Object.keys(tripWires)

console.log('available types')
console.log(types)

var x = TripWire('services', tripWires['services'])

x.on('services', console.log)
