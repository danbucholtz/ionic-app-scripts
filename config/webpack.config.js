module.exports = {
  devtool: "source-map",

  entry: '{{TMP}}/app/main.prod.js',

  output: {
    path: '{{BUILD}}',
    filename: 'main.js'
  }
};