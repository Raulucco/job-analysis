'use strict';
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var karma = require('karma');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var StringReplacePlugin = require('string-replace-webpack-plugin');
var fs = require('fs');
var snapshotPath;

try {
    snapshotPath = require('./snapshot-output.js');
} catch (error) {
    gutil.log('[snapshot path]', error.toString());
}

gulp.task('default', ['clean', 'dev', /*'test',*/ 'watch']);

gulp.task('watch', function () {
    gulp.watch(['src/**/*.ts', 'src/**/*.html'], [/*'test',*/ 'dev']);

    if (snapshotPath) {
        watchForBundleJS();
        watchForBundleMap();
    }

});

gulp.task('clean', function () {
    fs.unlink('./src/bundle.js');
    fs.unlink('./src/bundle.js.map');
});

gulp.task('dev', function (callback) {
    var config = require('./dev.webpack.config.js');
    config.devtool = 'sourcemap';

    var devCompiler = webpack(config);
    devCompiler.run(function (err, stats) {

        if (err) {
            throw new gutil.PluginError('dev', err);
        }

        gutil.log('[dev]', stats.toString({
            colors: true
        }));
        callback();
    });

});

gulp.task('test', function (callback) {
    new karma.Server({
        configFile: path.resolve(__dirname, 'karma.conf.js'),
        singleRun: true,
        watch: false
    }, callback).start();
});

gulp.task('deploy', ['clean'], function (callback) {

    var config = require('./deploy.webpack.config.js');

    webpack(config, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('deploy', err);
        }

        gutil.log('[deploy]', stats.toString({
            colors: true
        }));
        callback();
    });

});

gulp.task('webpack-dev-server', function () {
    var PORT = 8680;
    var config = require('./dev.webpack.config.js');

    config.module.loaders.unshift({
        test: /\.ts$/,
        loader: StringReplacePlugin.replace({
            replacements: [
                {
                    pattern: /\/{3}\s@@@([^@]*)@@@$/gm,
                    replacement: function (match, p1) {
                        return p1;
                    }
                }
            ]
        })
    });

    config.plugins = [new StringReplacePlugin('ts-loader')];

    new WebpackDevServer(webpack(config), {
        publicPath: '/',
        stats: {
            colors: true
        }
    }).listen(PORT, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server]', 'http://localhost:' + PORT + '/webpack-dev-server/index.html');
    });

    function insertReplacement(match, p1, p2, offset, str) {
        process.stdout.write(p1);
        process.stdout.write(p2);

        return p1 + p2;
    }
});

function watchForBundleJS() {
    gulp.watch('src/bundle.js', function (event) {
        if (event.type !== 'deleted') {
            fs.createReadStream(event.path)
                .pipe(
                    fs.createWriteStream(
                        path.resolve(
                            snapshotPath, 'src', path.basename(event.path))));

            gutil.log('[src/bundle.js]', 'copied to destination snapshot path');
        }

    });

}

function watchForBundleMap() {
    gulp.watch('src/bundle.js.map', function (event) {
        if (event.type !== 'deleted') {
            fs.createReadStream(event.path)
                .pipe(
                    fs.createWriteStream(
                        path.resolve(
                            snapshotPath, path.basename(event.path))));

            gutil.log('[src/bundle.js.map]', 'copied to destination snapshot path');
        }

    });
}
