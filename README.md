bootstrap-sass-loader
=================

Bootstrap configuration and loading package for webpack, using `bootstrap-sass`.

In a nutshell:

1. You've got the sass-loader to process sass files.
2. The npm bootstrap-sass package places the bootstrap files in /node_modules/bootstrap-sass/assets
3. You could simply create your own sass file to pick up bootstrap from this location, and you could require the js
   files here for the Bootstrap JavaScript code.
4. Or you could use this loader and load a js file that configures Bootstrap.

You can find an example of using this:

https://github.com/justin808/bootstrap-sass-loader-example

Usage
-----

Bootstrap use some fonts. You need to configure the correct loaders in your `webpack.config.js`. Example:

``` javascript
module.exports = {
  module: {
    loaders: [
      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  }
};
```

### Complete Bootstrap

To use the complete bootstrap package including styles and scripts with the default settings:

``` javascript
require("bootstrap-sass-webpack");
```


### Customized Bootstrap

1. Copy the file `bootstrap-sass.config.js` to your project. For these instructions, we'll assume that it's a peer file
   of your webpack.config file.
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

Example:

``` javascript
module.exports = {
  bootstrapCustomizations: "./bootstrap-customizations.scss",
  mainSass: "./main.scss",
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

Based on:
* bline/bootstrap-webpack
* DylanLukes/bootstrap-sass-webpack

