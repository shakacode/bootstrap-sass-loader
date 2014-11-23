module.exports = {
  verbose: function(config, msg) {
    if (config.verbose) {
      var args = Array.prototype.slice.call(arguments);
      console.log("[boostrap-sass-loader]: " + msg, args.slice(2));
    }
  }
};