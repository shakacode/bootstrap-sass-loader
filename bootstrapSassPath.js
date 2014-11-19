console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
console.log("About to require fs");
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");


var fs = require('fs');

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
console.log("fs is " + fs );
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
var path = require("path");

function createTestBootstrapSassParentPath(nLevelsUp) {
  var i;
  var levelsUp = "..";
  for (i = 0; i < nLevelsUp; i++) {
    levelsUp += "/..";
  }
  return path.normalize(path.join(__dirname, levelsUp, "node_modules", "bootstrap-sass"));
}

module.exports = {
  getPath: function() {
    var bootstrapSassParentPath;
    var i = 1;
    do {
      bootstrapSassParentPath = createTestBootstrapSassParentPath(i);
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
      console.log("bootstrapSassParentPath is " + bootstrapSassParentPath + ", i = " + i);
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
      i += 1;
    } while (!fs.existsSync(bootstrapSassParentPath) && i < 10);

    if (i == 10) {
      throw "Could not find path to bootstrap-sass. Check to see that it's in a parent directory of node_modules containing bootstrap-sass";
    }


    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
    console.log("bootstrapSassParentPath is " + bootstrapSassParentPath);
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");

    return path.join(bootstrapSassParentPath, "assets");
  }
};