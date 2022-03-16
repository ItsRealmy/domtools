const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dotoo.js',
    library: 'dt'
  },
}