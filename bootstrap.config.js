// Example file. Copy this to your project. Change then names of the referenced files or comment
// them out. Convention is to name sass partials to start with an '_'
module.exports = {
  verbose: true, // Set to true to show diagnostic information

  // IMPORTANT: Set next two configuration so you can customize
  // bootstrapCustomizations: gets loaded before bootstrap so you can configure the variables used
  // by bootstrap mainSass: gets loaded after bootstrap, so you can override a bootstrap style.
  // NOTE, these are optional.

  // Use preBootstrapCustomizations to change $brand-primary. Ensure this
  // preBootstrapCustomizations does not depend on other bootstrap variables.
  preBootstrapCustomizations: './_pre-bootstrap-customizations.scss',

  // Use bootstrapCustomizations to utilize other sass variables defined in
  // preBootstrapCustomizations or the _variables.scss file. This is useful to set one
  // customization value based on another value.
  bootstrapCustomizations: './_bootstrap-customizations.scss',

  mainSass: './_main.scss',

  // Default for the style loading
  styleLoader: 'style-loader!css-loader!sass-loader',
  //
  // If you want to use the ExtractTextPlugin
  //   and you want compressed
  //     styleLoader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
  //
  // If you want expanded CSS
  //   styleLoader: ExtractTextPlugin.extract('style-loader',
  // 'css-loader!sass?outputStyle=expanded'),

  scripts: {
    'util': true,
    'alert': true,
    'button': true,
    'carousel': true,
    'collapse': true,
    'dropdown': true,
    'modal': true,
    'scrollspy': true,
    'tab': true,
    'tooltip': true,
    'popover': true
  },
  styles: {
    'mixins': true,

    'normalize': true,
    'print': true,

    'reboot': true,
    'type': true,
    'images': true,
    'code': true,
    'grid': true,
    'tables': true,
    'forms': true,
    'buttons': true,

    'animation': true,
    'dropdown': true,
    'button-group': true,
    'input-group': true,
    'custom-forms': true,
    'nav': true,
    'navbar': true,
    'card': true,
    'breadcrumb': true,
    'pagination': true,
    'pager': true,
    'labels': true,
    'jumbotron': true,
    'alert': true,
    'progress': true,
    'media': true,
    'list-group': true,
    'responsive-embed': true,
    'close': true,

    'modal': true,
    'tooltip': true,
    'popover': true,
    'carousel': true,

    'utilities': true,
    'utilities-background': true,
    'utilities-spacing': true,
    'utilities-responsive': true
  }
};

