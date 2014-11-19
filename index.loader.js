module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  if (!remainingRequest || remainingRequest == null || remainingRequest == "") {
    var msg = "You specified the bootstrap-sass-loader with no configuration file. Please specify the configuration "
      + "file, like: 'bootstrap-sass!./bootstrap-sass.config.js' or use require('bootstrap-sass-loader').";
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    console.log(msg);
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    throw msg;
  }

  this.cacheable(true);
  return [
    'require(' + JSON.stringify("-!" + require.resolve("style-loader") + '!' + require.resolve("css-loader") +
    '!' + require.resolve("sass-loader") +
    '!' + require.resolve("./bootstrap-sass-styles.loader.js") + '!' + remainingRequest) + ');',
    'require(' + JSON.stringify("-!" + require.resolve("./bootstrap-sass-scripts.loader.js") + "!" + remainingRequest) + ');'
  ].join("\n");
};
