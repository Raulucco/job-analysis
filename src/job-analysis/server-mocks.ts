'use strict';
import angular = require('angular');

var jobAnalysisUrl = '/job-analysis';
var analysises = [
    {
        id: 1,
        name: 'First analysis',
        description: 'Description for the first analysis',
        orgId: 1,
        pdId: 1,
        pdNumber: 'pd-number-hash',
        pdTitle: 'pd title'
    },
    {
        id: 2,
        name: 'Second analysis',
        description: 'Description for the second analysis',
        orgId: 1,
        pdId: 1,
        pdNumber: 'pd-number-hash',
        pdTitle: 'pd title'
    },
    {
        id: 3,
        name: 'Third analysis',
        description: 'Description for the third analysis',
        orgId: 1,
        pdId: 1,
        pdNumber: 'pd-number-hash',
        pdTitle: 'pd title'
    }
];

module jobAnalysis.run {

    function run($httpBackend: angular.IHttpBackendService): void {
        $httpBackend.whenGET(jobAnalysisUrl).respond(analysises);
    }

    run.$inject = ['$httpBackend'];

    angular.module('cm.jobAnalysis').run(run);

}
