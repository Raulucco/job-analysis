'use strict';
import angular = require('angular');

export interface IUserTimeout {
    timeout: number;
}

export interface IUserTimeoutProvider {
    $get($interval: ng.IIntervalService): IUserTimeout;
    setSeconds(seconds: number): void;
    getDefaultTimeout(): number;
}


module user.timeout {
    export var name = 'userTimeout';
    var $interval: ng.IIntervalService;
    const DEFAULT_CHECK_TIME: number = 1000;

    class UserTimeoutProvider implements IUserTimeoutProvider {
        public static timeout: number;

        public setSeconds(seconds: number): void {
            UserTimeoutProvider.timeout = seconds;
        }

        public getDefaultTimeout(): number {
            return DEFAULT_CHECK_TIME;
        }

        public $get = userTimeoutFactory;

    }


    class UserTimeout implements IUserTimeout {

        public timeout: number;
        constructor(_timeout: number) {
            this.timeout = _timeout;
        }

        unlogInactiveUser(): void {
            $interval(() => {
                console.log('Check if user is logged');
            }, this.timeout);
        }
    }

    userTimeoutFactory.$inject = ['$interval'];
    function userTimeoutFactory(interval: ng.IIntervalService): UserTimeout {

        if (!$interval) {
            $interval = interval;
        }

        if (UserTimeoutProvider.timeout) {
            return new UserTimeout(UserTimeoutProvider.timeout);
        } else {
            return new UserTimeout(DEFAULT_CHECK_TIME);
        }

    }

    angular.module(name, [])
        .provider('UserTimeout', new UserTimeoutProvider());

}

export var name = user.timeout.name;
