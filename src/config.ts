'use strict';
import angular = require('angular');


module ja.config {
    angular.module('ja').config(conf);

    function conf($stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $httpProvider: any): void {
        $httpProvider.defaults.headers = {
            common: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            }
        };
        $urlRouterProvider.otherwise('/home/job-analysis');
        $stateProvider.state('home', {
            url: '/home',
            templateProvider: function() {
                let template = require('./home.html');
                return template;
            }
        });


    }

    conf.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
}
