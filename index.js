
/*

  MZeK

  modules:
    logfeed    ::    A continuous log (tailing a logfile)
    tripwire   ::    When a command changes (using watch)

*/


var LogFeed = require('./modules/logfeed')
var TripWire = require('./modules/tripwire')

function MZeK (options) {
  if (! (this instanceof MZeK)) return new MZeK (options)
  this.logfeed = LogFeed;
  this.tripwire = TripWire;
  this.options = options;
  console.log('<>', this.options)
}

MZeK.prototype.start = function () {
  var self = this
  var feeds = self.options.logfeeds;
  var tripwires = self.options.tripwires;
  var feedKeys = Object.keys(self.options.logfeeds) || []
  var tripwireKeys = Object.keys(self.options.tripwires) || []
  feedKeys = feedKeys.map(function (k) {
    return new Promise(function (resolve, reject) {
      try {
        var x = self.logfeed(k, self.options.logfeeds[k])
        resolve(x)
      } catch (e) { reject(e) }
    })
  })
  tripwireKeys = tripwireKeys.map(function (k) {
    return new Promise(function (resolve, reject) {
      try {
        var y = self.tripwire(k, self.options.tripwires[k])
        resolve(y)
      } catch (e) { reject(e) }
    })
  })
  return Promise.all([ ...tripwireKeys ])
}

module.exports = MZeK
