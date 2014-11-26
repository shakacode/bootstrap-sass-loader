bootstrap-sass-loader
=================

Bootstrap configuration and loading package for webpack, using the npm packages `bootstrap-sass` and `sass-loader`.

If you're looking for the less version, see [boostrap-webpack](https://github.com/bline/bootstrap-webpack). This project
is based on that version for less, with some minor differences, the main one being how the configuration file specifies
two sass files for customization.

In a nutshell:

1. You've got the sass-loader to process Sass files to CSS.
2. The npm bootstrap-sass package places the bootstrap files in `/node_modules/bootstrap-sass/assets`.
3. You could simply create your own sass file to pick up bootstrap from this location, and you could require the js
   files here for the Bootstrap JavaScript code. See the (sass-loader)[https://github.com/jtangelder/sass-loader] for
   instructions on configuring the directories.
4. Or you could use this loader and load a js file that configures Bootstrap.

You can find an example of using this:

[justin808/bootstrap-sass-loader-example](https://github.com/justin808/bootstrap-sass-loader-example)

Note, `bootstrap-sass` must be installed locally inside of `../node_modules` or a parent directories `node_modules`
directory relative to the loaded config file.

Boostrap Version
---
The version of sass-bootrap used is listed in peerDependencies, so you should be able to use whichever version you like.

Simply specify that version of `sass-bootrap` in your `package.json`, like this:

    "bootstrap-sass": "~3.3.1"


Usage
-----

### 1.a Complete Bootstrap

To use the complete bootstrap package including styles and scripts with the default settings:

``` javascript
require("bootstrap-sass-loader");
```

The disadvantage to using this setup is that you can't:

1. Customize the bootstrap variables: [Bootstrap Customization](http://getbootstrap.com/customize/)
2. You can't use the bootstrap variables for your own sass stylesheets.

### 1.b Customized Bootstrap

1. Copy the file `bootstrap-sass.config.js` to your project. You will specify the file path in the `require` statement.
2. Open that file to customize the location of a file for any Boostrap variable overrides, and your main Sass file that
   might depend on Bootstrap variables. The location of these two files are optional. You may also remove Sass or Js
   modules that you don't need.

Next, you may either require the sass files in a Js file, or you might specify this as an entry point.

```javascript
require("bootstrap-sass!./path/to/bootstrap-sass.config.js");
```

```
module.exports = {
  entry: [
    "bootstrap-sass!./path/to/bootstrap-sass.config.js"
  ]
```

#### `bootstrap-sass.config.js`

Here's a sample configuration file. The file included in the [bootstrap-sass-loader git repo](https://github.com/justin808/bootstrap-sass-loader/blob/master/bootstrap-sass.config.js)
has many more options.

``` javascript
module.exports = {
  bootstrapCustomizations: "./bootstrap-customizations.scss",
  mainSass: "./main.scss",
  styleLoader: "style-loader!css-loader!sass-loader", // see example for the ExtractTextPlugin
  scripts: {
    // add every bootstrap script you need
    'transition': true
  },
  styles: {
    // add every bootstrap style you need
    "mixins": true,

    "normalize": true,
    "print": true,

    "scaffolding": true,
    "type": true,
  }
};
```

### Font Configuration
Bootstrap use some fonts. You need to configure the correct loaders in your `webpack.config.js`. Example:

``` javascript
module.exports = {
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  }
};
```

## extract-text-plugin Notes
* If you don't run webpack like this, you might get a very obscure error:
```
PATH=$(npm bin):$PATH webpack --config webpack.rails.config.js
```

Alternate, you can put $(npm bin) in your path. Basically if you run `type webpack` and the path is your global one, then
you may have issues.

* You can configure the output file of the created CSS file by using a relative path to the output directory. For example:
```
  plugins: [
    new ExtractTextPlugin("../stylesheets/bootstrap-and-customizations.css")
  ]
```

### Based on:
* [boostrap-webpack](https://github.com/bline/bootstrap-webpack).
* DylanLukes/bootstrap-sass-webpack

