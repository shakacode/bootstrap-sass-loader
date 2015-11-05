var partials = [
  'mixins',

  'normalize',
  'print',

  'reboot',
  'type',
  'images',
  'code',
  'grid',
  'tables',
  'forms',
  'buttons',

  'animation',
  'dropdown',
  'button-group',
  'input-group',
  'custom-forms',
  'nav',
  'navbar',
  'card',
  'breadcrumb',
  'pagination',
  'pager',
  'labels',
  'jumbotron',
  'alert',
  'progress',
  'media',
  'list-group',
  'responsive-embed',
  'close',

  'modal',
  'tooltip',
  'popover',
  'carousel',

  'utilities',
  'utilities-background',
  'utilities-spacing',
  'utilities-responsive'
];
var path = require('path');
var bootstrapPath = require('./bootstrapPath');
var logger = require('./logger');

function addImportReturnDependency(loader, config, propertyName) {
  var fileNameResolved;
  var fileName = config[propertyName];
  if (fileName && fileName.length > 0) {
    fileNameResolved = path.relative(loader.context, fileName);

    logger.verbose(config, 'fileName for %s: %s', propertyName, fileNameResolved);
    loader.addDependency(fileNameResolved);
    return '@import \'' + fileNameResolved + '\';\n';
  }
}

module.exports = function(content) {
  var source;
  var config = this.exec(content, this.resourcePath);
  var pathToBootstrap = bootstrapPath.getPath(this.context);
  var relativePathToBootstrap = path.relative(this.context, pathToBootstrap);
  var start = '';
  this.cacheable(true);
  logger.verbose(config, 'bootstrap location: %s', relativePathToBootstrap);

  if (config.preBootstrapCustomizations) {
    start += addImportReturnDependency(this, config, 'preBootstrapCustomizations');
  }
  start +=
    // Absolute paths as these are created at build time.
    '@import \'' + path.join(relativePathToBootstrap,
      'scss/variables') + '\';\n';

  if (config.bootstrapCustomizations) {
    start += addImportReturnDependency(this, config, 'bootstrapCustomizations');
  }

  source = start + partials.filter(function(partial) {
      return config.styles[partial];
    }).map(function(partial) {
      return '@import \'' + path.join(relativePathToBootstrap, 'scss',
          partial) + '\';';
    }).join('\n');

  if (config.mainSass) {
    source += '\n' + addImportReturnDependency(this, config, 'mainSass');
  }

  source = source.replace(/\\/g, '/');

  logger.debug(config, 'Generated scss file is:\n' + source);

  return source;
};
