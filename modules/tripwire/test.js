
var TripWire = require('.')

var tripWires = {
  services: 'systemctl list-units --type service --state running --plain',
  listeningports: 'ss -tulpn'
}

var types = Object.keys(tripWires)

console.log('available types')
console.log(types)

var x = TripWire('listeningports', tripWires['listeningports'])

//x.on('listeningports', console.log)
