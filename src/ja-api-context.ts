'use strict';

import angular = require('angular');

module ja.apiContext {

    function directive($q: angular.IQService, context: IContext) {
        return {
            restrict: 'A',
            link: function(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) {

                var off = attrs.$observe('url', function(value: string) {
                    if (value) {
                        off();
                        context.url = value;
                    }
                });
            }
        };
    }

    directive.$inject = ['$q', 'context'];

    angular.module('ja').directive('jaApiContext', directive);
}
