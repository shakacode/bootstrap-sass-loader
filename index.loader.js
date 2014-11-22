module.exports = function (content) {
};

module.exports.pitch = function (remainingRequest) {
  this.cacheable(true);
  var configFilePath = remainingRequest;
  if (!configFilePath || configFilePath == null || configFilePath == "") {
    var msg = "You specified the bootstrap-sass-loader with no configuration file. Please specify the configuration "
      + "file, like: 'bootstrap-sass!./bootstrap-sass.config.js' or use require('bootstrap-sass-loader').";
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    console.log(msg);
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    throw msg;
  }
  var config = require(configFilePath); // , this.resourcePath);
  var styleLoader = config.styleLoader || "style-loader!css-loader!sass-loader";
  var styleLoaderCommand = 'require(' + JSON.stringify('-!' + styleLoader + '!' + require.resolve("./bootstrap-sass-styles.loader.js") + '!' + configFilePath) + ');';
  var jsLoaderCommand = 'require(' + JSON.stringify('-!' + require.resolve('./bootstrap-sass-scripts.loader.js') + '!' + configFilePath) + ');';
  var result = [styleLoaderCommand, jsLoaderCommand].join("\n");
  return result;
};
