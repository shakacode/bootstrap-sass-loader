var scripts = [
  'util',
  'alert',
  'button',
  'carousel',
  'collapse',
  'dropdown',
  'modal',
  'scrollspy',
  'tab',
  'tooltip',
  'popover'
];

var bootstrapPath = require('./bootstrapPath');
var path = require('path');

module.exports = function() {
};


// Create a list of require('path/to/bootstrap.js');
module.exports.pitch = function(configPath) {
  var pathToBootstrap = bootstrapPath.getPath(this.context);
  var config = require(configPath);
  this.cacheable(true);
  return scripts.filter(function(script) {
    return config.scripts[script];
  }).map(function(script) {
    var pathToBootstrapJsFile = JSON.stringify(path.join(pathToBootstrap, 'js/src',
        'bootstrap', script));
    return 'require(' + pathToBootstrapJsFile + ');';
  }).join('\n');
};
