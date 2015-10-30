'use strict';

import angular = require('angular');

module ja.config {

    angular.module('ja.jobAnalysis').config(conf);

    function conf(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider
    ): void {

        $stateProvider
            .state('home.job-analysis', {
                url: '/job-analysis',
                views: {
                    main: {
                        controller: 'JobAnalysisCtrl',
                        controllerAs: 'ja',
                        abstract: true,
                        templateProvider: function(): string {
                            return require('./index.html');
                        }
                    }
                }
            })
            .state('home.job-analysis.list', {
                controller: function() {
                    this.filter = '';
                },
                controllerAs: 'list',
                templateProvider: function(): string {
                    return require('./controllers/list.html');
                }
            })
            .state('home.job-analysis.create', {
                url: '/create',
                controller: 'JobAnalysisCreateCtrl',
                controllerAs: 'create',
                templateProvider: function(): string {
                    let template = require('./controllers/details-form.html');
                    return template.replace(/%name%/g, 'create');
                }
            })
            .state('home.job-analysis.edit', {
                url: '/edit/:id',
                controller: 'JobAnalysisEditCtrl',
                controllerAs: 'edit',
                templateProvider: function(): string {
                    let template = require('./controllers/details-form.html');
                    return template.replace(/%name%/g, 'edit');
                }
            })
        ;

    }

    conf.$inject = ['$stateProvider', '$urlRouterProvider'];
}
