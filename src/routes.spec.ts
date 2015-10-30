///<reference path="../typings/tsd.d.ts" />
'use strict';

import angular = require('angular');
import ja = require('./index');

'use strict';

describe('ja routes', function() {
    var $state: angular.ui.IStateService;

    beforeEach(angular.mock.module('ja'));
    beforeEach(angular.mock.inject(function($injector: any) {
        $state = $injector.get('$state');
    }));

    it('Has a home state', function() {
        var homeState = $state.get('home');
        expect(homeState.url).toBe('/home');
    });
});