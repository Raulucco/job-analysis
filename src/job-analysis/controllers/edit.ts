'use strict';

import angular = require('angular');

module controllers.details {

    var $state: angular.ui.IStateService;
    var $q: angular.IQService;
    var $stateParams: angular.ui.IStateParamsService;
    var _currentJobAnalysis: IHydrator;
    var _currentAnalyses: any;
    var _jobAnalysisGateAway: IGateAwayService<IJobAnalysis>;

    interface IDetailScope extends angular.IScope {
        jobAnalysisDetails: angular.IFormController;
    }

    class JobAnalysisEdit {
        static $inject: Array<string> = ['$q', '$state',
            '$stateParams',
            'currentJobAnalysis', 'currentAnalyses', 'JobAnalysisGateAway'];
        static _NAME_ = 'JobAnalysisEditCtrl';

        private jobAnalysis: angular.resource.IResource<IJobAnalysis>;
        private form: angular.IFormController;

        constructor(
            q: angular.IQService,
            state: angular.ui.IStateService,
            stateParams: angular.ui.IStateParamsService,
            currentJobAnalysis: IHydrator,
            currentAnalyses: any,
            jobAnalysisGateAway: IGateAwayService<IJobAnalysis>
        ) {
            $q = q;
            $state = state;
            _currentJobAnalysis = currentJobAnalysis;
            _currentAnalyses = currentAnalyses;
            _jobAnalysisGateAway = jobAnalysisGateAway;

            let jobAnalysis = <IJobAnalysis>currentJobAnalysis.get() || { id: (<any>stateParams).id };
            this.jobAnalysis = jobAnalysisGateAway.get(jobAnalysis);
        }

        submit(event: angular.IAngularEvent) {
            event.preventDefault();
            if (this.form.$valid) {
                _jobAnalysisGateAway.update(this.jobAnalysis).$promise
                    .then((response: any) => {
                        _currentJobAnalysis.hydrate(this.jobAnalysis);
                        _currentAnalyses.update(this.jobAnalysis);
                        $state.transitionTo('home.job-analysis.list');
                    }, fail);
            }

            function fail(error: any) {
                //TODO: display error
            }
        }

    }

    angular.module('jobAnalysis.controllers')
        .controller(JobAnalysisEdit._NAME_, JobAnalysisEdit);

}
