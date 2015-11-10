var fs = require('fs');
var path = require('path');

function bootstrapNotFound() {
  var msg = 'Could not find path to bootstrap. Check to see that it is in a parent ' +
    'directory of config file containing node_modules/bootstrap';
  console.error('ERROR: ' + msg);
  throw new Error(msg);
}

function createTestParentPath(configPath, nLevelsUp) {
  var parentPath;
  var i;
  var levelsUp = configPath;
  for (i = 0; i < nLevelsUp; i++) {
    levelsUp += '/..';
  }
  parentPath = path.resolve(levelsUp);
  if (parentPath === '/') {
    bootstrapNotFound();
  }

  return path.resolve(path.join(levelsUp, 'node_modules', 'bootstrap'));
}

module.exports = {
  getPath: function(configPath) {
    var bootstrapParentPath;
    var i = 0;
    do {
      bootstrapParentPath = createTestParentPath(configPath, i);
      i += 1;
    } while (!fs.existsSync(bootstrapParentPath) && i < 10);

    if (i === 10) {
      bootstrapNotFound();
    }
    return bootstrapParentPath;
  }
};
