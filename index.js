// This one is used when no configuration is passed to the loader
// When this is done, there is no option to modify the bootstrap configuration
// If one is not going to use the Sass power, it would be more efficient to use the pre-compiled version of bootstrap.
var pathToBootstrap = path.normalize(__dirname + "/../bootstrap-sass/assets/");
var pathToBootstrapSass = pathToBootstrap +  "stylesheets/_bootstrap.scss";
var pathToBootstrapJs = pathToBootstrap +  "javacripts/bootstrap.js";
require("style!css!sass!" + pathToBootstrapSass);
require(pathToBootstrapJs);
