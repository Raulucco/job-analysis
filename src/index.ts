'use strict';

import angular = require('angular');
import commonModule = require('./common/module');
import organizationsModule = require('./organizations/index');
import departmentsModule = require('./departments/index');
import jobAnalysisModule = require('./job-analysis/index');

 module ja.app {
    export var name = 'ja';
    angular.module(name, [
        commonModule.name,
        organizationsModule.name,
        departmentsModule.name,
        jobAnalysisModule.name,
        'ui.router'
    ]);
}

export var name = ja.app.name;

require('./config');
require('./values');
require('./ja-api-context');
