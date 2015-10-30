// Karma configuration
// Generated on Wed Oct 14 2015 09:52:43 GMT+0200 (Central Europe Daylight Time)
var path = require('path');
var webpackConf = require('./dev.webpack.config.js');

webpackConf.devtool = 'eval';
delete webpackConf.entry;
delete webpackConf.output;
webpackConf.webpackMiddleware = {
    stats: {
        chunkModules: false,
        colors: true
    }
};
webpackConf.module.preLoaders.push({
    test: /\.js$/,
    exclude: [
        /node_modules/,
        /vendors/,
        /\.spec.js$/
    ],
    loader: 'istanbul-instrumenter'
});

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'vendors/angular/angular.js',
            'vendors/angular-ui-router/release/angular-ui-router.min.js',
            'vendors/angular-resource/angular-resource.js',
            'vendors/angular-mocks/angular-mocks.js',
            'vendors/angular-messages/angular.messages.js',
            'src/**/*.spec.ts'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['webpack', 'sourcemap']
        },

        coverageReporter: {
            type: 'text'
        },

        webpack: webpackConf,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox', 'Chrome'],

        client: {
            captureConsole: true,
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    })
}
