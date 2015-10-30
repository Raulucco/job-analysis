var webpack = require('webpack');
var path = require('path');
var excludes = [
    /node_modules/,
    /bower_components/,
    /libs/,
    /vendors/,
    /3rdParty/,
    /coverage/
];

module.exports = (
    {
        "cache": false,
        "context": __dirname,
        "entry": "./src/index.ts",
        "output": {
            "path": path.resolve(__dirname, 'src'),
            "filename": "bundle.js",
            "publicPath": "/src/",
        },
        "devtool": "sourcemap",
        "debug": true,
        "resolve": {
            "extensions": [
                "",
                ".webpack.js",
                ".web.js",
                ".ts",
                ".js"
            ]
        },
        "externals": {
            "jquery": "jQuery",
            "angular": "angular"
        },
        "module": {
            "loaders": [
                {
                    "test": /\.ts$/,
                    "loader": "ts-loader",
                    "exclude": excludes
                },
                {
                    "test": /\.html$/,
                    "loader": "html",
                    "exclude": excludes
                }
            ],
            "preLoaders": [
                {
                    "test": /\.ts$/,
                    "exclude": excludes,
                    "loader": "tslint"
                }
            ]
        }
    });
