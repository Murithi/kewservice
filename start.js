
// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    "presets": [
        [
          "env", {
            "targets": {
              "node": "current"
            }
          }
        ]
      ],
    plugins: ["transform-object-rest-spread"]
})

// Import the rest of our application.
module.exports = require('./src/server.js')