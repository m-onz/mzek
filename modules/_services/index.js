
var runcmd = require('../../lib/runcmd')

module.exports = {
  runningServices: function (cb) {
    runcmd.Exec('systemctl list-units --type service --state running',
      function (e, r) {
        if (e) return cb(e)
        var exclude = [
          'LOAD',
          'UNIT',
          'ACTIVE',
          'SUB',
          '23',
          'To'
        ]
        r.response.forEach(function (row) {
          var row = row.split(' ')[0]
          if (!exclude.includes(row)) cb(null, row)
        })
      }
    )
  },
  allServices: function (cb) {
    runcmd.Exec('systemctl list-units --type service --all',
      function (e, r) {
        if (e) return cb(e)
        var exclude = [
          'The',
          'units',
          'all'
        ]
        r.response.forEach(function (row) {
          var row = row.split(' ')[2]
          if (row.length && !exclude.includes(row)) cb(null, row)
        })
      }
    )
  }
}
