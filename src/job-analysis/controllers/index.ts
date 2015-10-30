'use strict';

import angular = require('angular');

module jobAnalysis.controllers {
    export var name = 'jobAnalysis.controllers';
    angular.module(name, []);
}

require('./list');
require('./edit');
require('./create');

export var name = jobAnalysis.controllers.name;
