module.exports = {
  verbose: function(config, msg) {
    if (config.verbose) {
      var args = Array.prototype.slice.call(arguments);
      var a = ["[boostrap-sass-loader]: " + msg];
      a = a.concat(args.slice(2));
      console.log.apply(null, a);
    }
  }
};