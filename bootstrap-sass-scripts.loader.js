var scripts = [
  'transition',
  'alert',
  'button',
  'carousel',
  'collapse',
  'dropdown',
  'modal',
  'tooltip',
  'popover',
  'scrollspy',
  'tab',
  'affix'
];

var bootstrapSassPath = require("./bootstrapSassPath");
var path = require("path");

module.exports = function () {};
module.exports.pitch = function (configPath) {
  var pathToBootstrapSass = bootstrapSassPath.getPath(this.context);
  this.cacheable(true);
  var config = require(configPath);
  return scripts.filter(function (script) {
    return config.scripts[script];
  }).map(function (script) {
    var pathToBootstrapJsFile = JSON.stringify(path.join(pathToBootstrapSass, "javascripts", "bootstrap", script));
    return "require(" + pathToBootstrapJsFile + ");";
  }).join("\n");
};
