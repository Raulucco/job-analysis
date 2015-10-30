'use strict';

import angular = require('angular');

module jobAnalysis.controllers.list {

    var $state: angular.ui.IStateService;
    var _jobAnalysisGateAway: IGateAwayService<IJobAnalysis>;
    var _jobAnalysisFacade: IJobAnalysisFacade;
    var _errorDialog: any;

    class JobAnalysisList implements IObserver {
        static $inject: string[] = ['$state',
            'JobAnalysisGateAway',
            'currentJobAnalysesFacade',
            'common.errorNotifier'];
        static _NAME_: string = 'JobAnalysisCtrl';
        public analyses: any;

        constructor(state: angular.ui.IStateService,
            jobAnalysisGateAway: IGateAwayService<IJobAnalysis>,
            jobAnalysisFacade: IJobAnalysisFacade,
            errorDialog: any
        ) {
            $state = state;
            _jobAnalysisGateAway = jobAnalysisGateAway;
            _jobAnalysisGateAway.initResource();
            _jobAnalysisFacade = jobAnalysisFacade;
            _jobAnalysisFacade.subscribeToAnalyses(this);
            _errorDialog = errorDialog;
            this.loadAnalysises();
        }

        loadAnalysises(): void {
            if (!this.analyses || !this.analyses.length) {
                _jobAnalysisGateAway.query().$promise
                    .then((response: any) => {
                        _jobAnalysisFacade.setChosenJobAnalyses(response);
                        $state.transitionTo('home.job-analysis.list');
                    }, fail);

            }

            function fail(error: any) {
                _errorDialog.setError(error);
                _errorDialog.displayError();
            }
        }

        notify() {
            this.analyses = _jobAnalysisFacade.getCurrentAnalyses();
        }

        choseAnalysis(event: angular.IAngularEvent, analysis: IJobAnalysis): void {
            event.preventDefault();
            _jobAnalysisFacade.setChosenJobAnalysis(analysis);
            $state.transitionTo('home.job-analysis.edit', { id: analysis.id });
        }

        transitionToCreate(event: angular.IAngularEvent) {
            event.preventDefault();
            _jobAnalysisFacade.flushChosenJobAnalysis();
            $state.transitionTo('home.job-analysis.create');
        }

    }

    angular.module('jobAnalysis.controllers')
        .controller(JobAnalysisList._NAME_, JobAnalysisList);
}
