var path = require("path");
module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  this.cacheable(true);
  var pathToBootstrapSass = path.normalize(__dirname + "/../bootstrap-sass/assets");
  return [
    'require(' + JSON.stringify("-!" + require.resolve("style-loader") + '!' + require.resolve("css-loader") +
    '!' + require.resolve("sass-loader") + "?includePaths[]=" + pathToBootstrapSass +
    '!' + require.resolve("./bootstrap-sass-styles.loader.js") + '!' + remainingRequest) + ');',
    'require(' + JSON.stringify("-!" + require.resolve("./bootstrap-sass-scripts.loader.js") + "!" + remainingRequest) + ');'
  ].join("\n");
};
