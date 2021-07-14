
var cp = require('child_process')
var exec = cp.exec;
var spawn = cp.spawn;

function Spawn (command, args = [], cb) {
  var result = ''
  var ls = spawn(command, args)
  ls.stdout.on('data', function (data) {
    result += data
  })
  ls.stderr.on('data', function (data) {
    result += data
  })
  ls.on('error', function (err) {
    cb (err)
  })
  ls.on('close', function (code) {
    cb (null, {
      type: 'spawn',
      command: command,
      args: args,
      code: code,
      result: result
      .toString('utf8')
      .trim()
      .split('\n')
    })
  })
}

function Exec (command, cb) {
  exec(command, function (error, stdout, stderr) {
    if (error) {
      cb (error)
      return;
    }
    cb(null, {
      type: 'exec',
      command: command,
      response: stdout.trim()
      .split('\n')
      .concat(stderr.trim().split('\n'))
      .filter(function (i) { return i.length })
    })
  })
}

function commandPromise (command) {
  return new Promise(function (resolve, reject) {
    Exec (command, function (err, data){
      if (err) return reject (err)
      resolve(data)
    })
  })
}

function combine () {
  var args = Array.from(arguments)
  var output = []
  args = args.map(function (i) {
    return i.map(commandPromise)
  })
  args.forEach(function (i) {
    i.forEach(function (x) {
      output.push(x)
    })
  })
  return output
}

function combineRunExec (cmds) {
  var _cmds = combine(cmds)
  return Promise.all(_cmds)
}

module.exports = {
  Exec: Exec,
  Spawn: Spawn,
  combine: combine,
  commandPromise: commandPromise,
  combineRunExec: combineRunExec
}
