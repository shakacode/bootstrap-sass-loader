var logger = require("./logger");

module.exports = function (content) {
};

module.exports.pitch = function (remainingRequest) {
  this.cacheable(true);

  // Webpack 1.7.3 uses this.resourcePath. Leaving in remaining request for possibly older versions of Webpack
  var configFilePath = this.resourcePath || remainingRequest;

  if (!configFilePath || configFilePath == null || configFilePath == "") {
    var msg = "You specified the bootstrap-sass-loader with no configuration file. Please specify the configuration "
      + "file, like: 'bootstrap-sass!./bootstrap-sass.config.js' or use require('bootstrap-sass-loader').";
    console.error("ERROR: " + msg);
    throw new Error(msg);
  }
  
  var config = require(configFilePath);
  var styleLoader = config.styleLoader || "style-loader!css-loader!sass-loader";
  logger.verbose(config, "styleLoader: %s", styleLoader);

  var styleLoaderCommand = 'require(' + JSON.stringify('-!' + styleLoader + '!' + require.resolve("./bootstrap-sass-styles.loader.js") + '!' + configFilePath) + ');';
  var jsLoaderCommand = 'require(' + JSON.stringify('-!' + require.resolve('./bootstrap-sass-scripts.loader.js') + '!' + configFilePath) + ');';
  var result = [styleLoaderCommand, jsLoaderCommand].join("\n");
  return result;
};
