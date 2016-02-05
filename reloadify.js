var sendevent = require('sendevent');
var watch = require('watch');
var uglify = require('uglify-js');
var fs = require('fs');
var ENV = process.env.NODE_ENV || 'development';

var clientScript = fs.readFileSync(__dirname + '/client.js', 'utf8');
var script = uglify.minify(clientScript, { fromString: true }).code;

function reloadify(app, dir) {
  if(ENV !== 'development') {
    app.locals.watchScript = '';
    return;
  }
  
  var events = sendevent('/eventstream');
  app.use(events);
  watch.watchTree(dir, function(f, cur, prev) {
    events.broadcast({ msg: 'reload' });
  });
  app.locals.watchScript = '<script>' + script + '</script>';
}

module.exports = reloadify;

