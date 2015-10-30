'use strict';
var webpack = require('webpack');
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
        "context": __dirname,
        "entry": "./src/index.ts",
        "output": {
            "path": "./src",
            "filename": "bundle.js"
        },
        "watch": false,
        "plugins": [new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin()],
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
