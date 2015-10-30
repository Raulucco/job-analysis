///<reference path="../../typings/tsd.d.ts" />
'use strict';

import userTimeout = require('./timeout');

describe('User timeout', function() {
    var provider: userTimeout.IUserTimeoutProvider;
    beforeEach(() => {

        angular.mock.module(userTimeout.name, (UserTimeoutProvider: userTimeout.IUserTimeoutProvider) => {
            provider = UserTimeoutProvider;
        });

    });

    describe('Timeout check period', () => {
        var userTimeoutService: userTimeout.IUserTimeout;

        beforeEach(angular.mock.inject((UserTimeout: userTimeout.IUserTimeout) => {
            userTimeoutService = UserTimeout
        }));

        it('Sets the default timeout period', () => {
            expect(userTimeoutService.timeout)
                .toBe(provider.getDefaultTimeout());
        });
    });

});
