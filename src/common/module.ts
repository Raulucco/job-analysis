'use strict';

import angular = require('angular');

module common {
    export var name = 'common';
    angular.module('common', []);
}

require('./services');

export var name = common.name;
