// This one is used when no configuration is passed to the loader
// When this is done, there is no option to modify the bootstrap configuration
// If one is not going to use the Sass power, it would be more efficient to use the pre-compiled version of bootstrap.
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
console.log("Loading bootstrap-no-config.js");
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

var fs = require('fs');
var path = require("path");
var bootstrapSassPath = require("./bootstrapSassPath");

module.exports = function () {};
module.exports.pitch = function (configPath) {

  var pathToBootstrapSass = bootstrapSassPath.getPath();

  var pathToBootstrapSassAll = path.join(pathToBootstrapSass, "stylesheets", "_bootstrap.scss");
  var pathToBootstrapJs =  path.join(pathToBootstrapSass, "javascripts", "bootstrap.js");
  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
  console.log("pathToBootstrapSassAll is " + pathToBootstrapSassAll);
  console.log("pathToBootstrapJs is " + pathToBootstrapJs);
  console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");

  if (!fs.existsSync(pathToBootstrapSassAll)) {
    throw "Could not find bootstrap sass file: " + pathToBootstrapSassAll;
  }

  if (!fs.existsSync(pathToBootstrapJs)) {
    throw "Could not find bootstrap js file: " + pathToBootstrapJs;
  }

  require("style!css!sass!" + pathToBootstrapSassAll);
  require(pathToBootstrapJs);
};
