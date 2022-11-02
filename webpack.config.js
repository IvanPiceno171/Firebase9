const path = require('path');

module.exports = {
    // mode can be devolpment or production
    mode: 'development',
    // loads entry from index.js
    entry: './src/index.js',
    output: {
        // path variable 
        // resolve() method
        // __dirname grabs current directory
        // 'dist' goes inside dist folder
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}