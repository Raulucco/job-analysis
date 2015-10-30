Job Analysis front-end application
==================================
This is the client application for the job analysis application.

The entry file is `src/index.ts` and the javascript to include in the page is `src/bundle.js`.
`src/bundle.js` is an automatic genererated file, is not meant to be edited. But we need to check it out on perforce so the changes that we make on other files get translated into the file.

The application is configure to be developed with TDD.

Developement Tools
------------------

+ The development environment is based on [nodejs](https://nodejs.org/en/).
+ The application is written in [typescript](http://www.typescriptlang.org/). This helps writte more objected oriented code that translate into javascript and check for type consistency during development.
+ The framework to develop the application is [angular](https://angularjs.org/).
+ It uses [gulp](http://gulpjs.com/) for automate the boring development tasks.
+ Libraries management for testing is resolved with [bower](http://bower.io/)., the bower_components directory is customized to be the vendors directory.
+ The tests are held by [karma](http://karma-runner.github.io/0.13/index.html).
+ The test are based on [jasmine](https://github.com/jasmine/jasmine).
+ [webpack](http://webpack.github.io/), to bundle the code.

Installation
------------

To setup your application for the first time open a command prompt in the root directory of the application:
+ on the command prompt run `npm install`. Install the node packages.
+ `bower install`. Install the libraries.
+ `tsd install`. Instal the type definitions for any library used.

If anyone made any changes like installing a package or update run the same commands as before. Notice that the order is not important.

For installing a new library run `bower install <package_name>[#version] --save`. It is posible to install different versions of the libraries by specify a custom name followed by the source addrees.
For installing a new node module that will be used during development use npm: `npm install <package> --save-dev`.

It is recommended that once you installed node on your system you install the following packages globally:
+ Gulp => `npm install -g gulp`.
+ Karma => `npm install -g karma`.
+ Typescript => `npm install -g typescript`.
+ Tsd => `npm install -g tsd`.
+ Bower `npm install -g bower`.
+ You can install everything at once => `npm install -g gulp karma typescript tsd bower`.

Create a `snapshot-output.js` file at the root that exports the absolute path where you have configure the snapshot files to be copied. Remember not to submit this file as other developers may have a different configuration.

`module.exports = 'path-to-snapshot-directory-where-bundle-will-be-copied'`

Workflow
--------

The recommended way of developing is by writing your test first and then writting the code that make the test pass.
Test are executeds by running `npm test` or `karma start`.
On the `gulpfile.js` at the root directory there are already provided the task for development and for depployment of your code.
The default task will compile and generate a javascript file (`src/bundle.js`) and a map file (`src/bundle.js.map`), it will watch on the directory for changes and regenerate with the latest version of the code.
The default task could be run by executing on a command prompt at the root directory: `gulp` or `gulp default`.

If you want to development with and mock your services but see it running on a web page run `gul webpack-dev-server` and open a browser tab with the default direction `http://localhost:8680/index.html`
Notice that you will see your changes loaded on the page but the bundle file is served from memory the file is on the system is not been changed.

When you have al of your test green and implemented you desire functionality run `gulp deploy`. This will generate a minify version of the bundle file to be included in production.

When workiing with the webpack-dev-server it is posible to add mocks or any environment especifics insided of `/// @@@<your stuff>@@@`.

Important notice
================

Do not submit node_modules, vendors, typings directories or the `src/bundle.js.map` file. Those are intended for your local development.

Happy coding!
