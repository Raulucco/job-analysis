'use strict';

import angular = require('angular');
import controllers = require('./controllers/index');
import services = require('./service');

module jobAnalysis {
    export var name = 'ja.jobAnalysis';
    angular.module(name, [
        /// @@@'ngMockE2E',@@@
        'ui.router',
        'ngMessages',
        controllers.name,
        services.name
    ]);
}

export var name = jobAnalysis.name;

require('./config');
/// @@@require('./server-mocks');@@@
