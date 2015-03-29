module.exports = {
  log: function() {
    var msg = arguments[1];
    var args = Array.prototype.slice.call(arguments);
    var a = ["[boostrap-sass-loader]: " + msg];
    a = a.concat(args.slice(2));
    console.log.apply(null, a);
  },
  verbose: function(config, msg) {
    if (config.verbose) {
      this.log.apply(this, arguments);
    }
  },
  debug: function(config, msg) {
    if (config.debug) {
      this.log.apply(this, arguments);
    }
  }
};