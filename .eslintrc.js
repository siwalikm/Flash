module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jquery": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
         "linebreak-style": [
            "error",
            "unix"
        ], 
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};