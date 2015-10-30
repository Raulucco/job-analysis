///<reference path="../../typings/tsd.d.ts" />
///<reference path="../common/index.d.ts" />
'use strict';

describe('Current Job Analysis', function() {
    var currentJobAnalysis: IHydrator;
    var emptyJobAnalysisMock: IJobAnalysis = {
        id: null,
        description: null,
        name: null,
        created: null,
        orgId: null,
        pdId: null,
        pdNumber: null,
        pdTitle: null
    };
    var jobAnalysisMock: IJobAnalysis = {
        id: 55,
        description: 'description',
        name: 'name',
        created: 'null',
        orgId: 8888,
        pdId: 79,
        pdNumber: 'has-number',
        pdTitle: 'tile'
    };

    beforeEach(function() {
        angular.mock.module('ja.jobAnalysis');
        angular.mock.inject(function(_currentJobAnalysis_: IHydrator) {
            currentJobAnalysis = _currentJobAnalysis_;
        });
    });

    it('is empty by default', function() {
        expect(currentJobAnalysis.get()).toEqual(emptyJobAnalysisMock);
    });

    it('can mimic a chosen jobAnalysis', function() {
        currentJobAnalysis.hydrate(jobAnalysisMock);
        expect(currentJobAnalysis.get()).toEqual(jobAnalysisMock);
    });


    it('resets the current chosen jobAnalysis', function() {
        currentJobAnalysis.hydrate(jobAnalysisMock);
        expect(currentJobAnalysis.get()).toEqual(jobAnalysisMock);
        currentJobAnalysis.flush();
        expect(currentJobAnalysis.get()).toEqual(emptyJobAnalysisMock)
    });
});
