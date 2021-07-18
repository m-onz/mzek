
var mzekNode = require('./modules/node')

mzekNode(function (e, msg) {
  if (e) throw e;
  console.log('... ', JSON.stringify(msg.value.content, null, 2))
})
