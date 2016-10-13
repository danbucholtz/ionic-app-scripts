var path = require('path');

var webpackConfig = {};
webpackConfig.devtool = 'source-map';
webpackConfig.entry = '{{TMP}}/app/main.prod.js';
webpackConfig.output = {
  path: '{{BUILD}}',
  filename: 'main.js'
};

webpackConfig.module = {};

webpackConfig.resolve = {
  modules: [path.resolve(__dirname, "src"), "node_modules"],
  extensions: [".js", ".ts", ".json"]
};

webpackConfig.module.loaders = [];
webpackConfig.module.loaders.push({
  //test: /\.(ts|js)$/,
  loader: path.resolve(path.join(__dirname, "..", 'dist', 'loaders', 'ionic-loader.js'))
});

if (process.env.IONIC_ENV !== 'prod') {
  webpackConfig.entry = '{{SRC}}/app/main.dev.ts';
}

module.exports = webpackConfig;