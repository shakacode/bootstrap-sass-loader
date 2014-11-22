var fs = require('fs');
var path = require("path");

function bootstrapNotFound() {
  var msg = "Could not find path to bootstrap-sass. Check to see that it's in a parent directory of config file " +
    "containing node_modules/bootstrap-sass";
  console.error("ERROR: " + msg);
  throw new Error(msg);
}

function createTestBootstrapSassParentPath(configPath, nLevelsUp) {
  var i;
  var levelsUp = configPath;
  for (i = 0; i < nLevelsUp; i++) {
    levelsUp += "/..";
  }
  var parentPath = path.resolve(levelsUp);
  if (parentPath === "/") {
    bootstrapNotFound();
  }

  var result = path.resolve(path.join(levelsUp, "node_modules", "bootstrap-sass"));
  return result;
}

module.exports = {
  getPath: function(configPath) {
    var bootstrapSassParentPath;
    var i = 0;
    do {
      bootstrapSassParentPath = createTestBootstrapSassParentPath(configPath, i);
      i += 1;
    } while (!fs.existsSync(bootstrapSassParentPath) && i < 10);

    if (i == 10) {
      bootstrapNotFound();
    }
    return path.join(bootstrapSassParentPath, "assets");
  }
};