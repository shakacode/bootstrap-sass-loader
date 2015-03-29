var partials = [
  "mixins",

  "normalize",
  "print",

  "scaffolding",
  "type",
  "code",
  "grid",
  "tables",
  "forms",
  "buttons",

  "component-animations",
  "glyphicons",
  "dropdowns",
  "button-groups",
  "input-groups",
  "navs",
  "navbar",
  "breadcrumbs",
  "pagination",
  "pager",
  "labels",
  "badges",
  "jumbotron",
  "thumbnails",
  "alerts",
  "progress-bars",
  "media",
  "list-group",
  "panels",
  "wells",
  "close",

  "modals",
  "tooltip",
  "popovers",
  "carousel",

  "utilities",
  "responsive-utilities"
];
var path = require("path");
var fs = require('fs');
var bootstrapSassPath = require("./bootstrapSassPath");
var logger = require("./logger");

function addImportReturnDependency(loader, config, propertyName) {
  var fileName = config[propertyName];
  if (fileName && fileName.length > 0) {
    var fileNameResolved = path.resolve(fileName);
    if (fs.existsSync(fileNameResolved)) {
      logger.verbose(config, "fileName for %s: %s", propertyName, fileNameResolved);
      loader.addDependency(fileNameResolved);
      return "@import \"" + fileNameResolved + "\";\n";
    } else {
      var msg = "Could not find path to config." + propertyName + ": " + fileNameResolved;
      console.error("ERROR: " + msg);
      throw new Error(msg);
    }
  }
}

module.exports = function (content) {
  this.cacheable(true);
  var config = this.exec(content, this.resourcePath);
  var pathToBootstrapSass = bootstrapSassPath.getPath(this.context);
  logger.verbose(config, "bootstrap-sass location: %s", pathToBootstrapSass);

  var relativePath = path.relative(this.context, pathToBootstrapSass);
  var start = "";
  // This needs to be relative
  var iconFontPath = "$icon-font-path: \"" + path.join(relativePath, "fonts/bootstrap/") + "\";";
  logger.verbose(config, "Setting: %s", iconFontPath);

  if (config.preBootstrapCustomizations) {
    start += addImportReturnDependency(this, config, "preBootstrapCustomizations");
  }
  start +=
    // Absolute paths as these are created at build time.
    "@import \"" + path.join(pathToBootstrapSass, "stylesheets/bootstrap/variables") + "\";\n" + iconFontPath + "\n";

  if (config.bootstrapCustomizations) {
    start += addImportReturnDependency(this, config, "bootstrapCustomizations");
  }

  var source = start + partials.filter(function(partial) {
      return config.styles[partial];
    }).map(function(partial) {
      return "@import \"" + path.join(pathToBootstrapSass, "stylesheets/bootstrap", partial) + "\";";
    }).join("\n");

  if (config.mainSass) {
    source += "\n" + addImportReturnDependency(this, config, "mainSass");
  }

  logger.debug(config, "Generated scss file is:\n" + source);

  return source;
};
