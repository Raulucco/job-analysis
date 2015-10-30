'use strict';
import angular = require('angular');

module ja.values {
    var context: IContext = {
        url: null
    };

    angular.module('ja').value('context', context);
}
