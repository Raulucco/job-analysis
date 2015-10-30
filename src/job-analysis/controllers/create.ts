'use strict';

import angular = require('angular');

interface IDepartments {
    orgId: number;
    name: string;
    shortName: string;
    deptId: number;
}

module jobAnalysis.controllers.create {

    var $state: angular.ui.IStateService;
    var _currentJobAnalysis: IHydrator;
    var _currentAnalyses: any;
    var _jobAnalysisGateAway: IGateAwayService<IJobAnalysis>;
    var _organizationsGateAway: any;
    var _departmentsGateAway: any;
    var _errorDialog: any;

    const SAVE_ERROR = 'There was an error while creating the new job analysis.\nPlease try again later.';
    const LOAD_DEPARTMENTS_ERROR = 'There was an error loading the departments,\nPlease contact the web administrator.';
    const LOAD_ORGANIZATIONS_ERROR = 'There was an error.\nPlease refresh your browser and try again.';

    var emptyJobAnalysis: IJobAnalysis = {
        description: null,
        name: null,
        orgId: null,
        pdId: null,
        pdNumber: null,
        pdTitle: null
    };

    class JobAnalysisCreate {
        static _NAME_: string = 'JobAnalysisCreateCtrl';
        static $inject: Array<string> = ['$state',
            'currentJobAnalysis', 'currentAnalyses',
            'JobAnalysisGateAway',
            'OrganizationsGateAway',
            'DepartmentsGateAway',
            'common.errorNotifier'
        ];

        form: angular.IFormController;
        jobAnalysis: IJobAnalysis;
        organizations: Array<any>;
        departments: Array<any>;

        constructor(state: angular.ui.IStateService,
            currentJobAnalysis: IHydrator,
            currentAnalyses: any,
            jobAnalysisGateAway: IGateAwayService<IJobAnalysis>,
            organizationsGateAway: any,
            departmentsGateAway: any,
            errorDialog: any
        ) {
            $state = state;
            _currentJobAnalysis = currentJobAnalysis;
            _currentAnalyses = currentAnalyses;
            _jobAnalysisGateAway = jobAnalysisGateAway;
            _organizationsGateAway = organizationsGateAway;
            _departmentsGateAway = departmentsGateAway;
            _errorDialog = errorDialog;
            this.setJobAnalysis();
            this.loadOrganizations();
        }

        private loadOrganizations(): void {
            _organizationsGateAway.query()
                .then((response: Array<any>) => {
                    this.organizations = response;
                }, fail);

            function fail(error: any) {
                _errorDialog.setError(LOAD_ORGANIZATIONS_ERROR);
                _errorDialog.displayError();
            }
        }

        loadDepartments() {
            _departmentsGateAway.query({orgId: this.jobAnalysis.orgId})
                .$promise
                .then((response: Array<IDepartments>) => {
                    this.departments = response;
                }, fail);

            function fail(error: any) {
                _errorDialog.setError(LOAD_DEPARTMENTS_ERROR);
                _errorDialog.displayError();
            }
        }

        submit(event: angular.IAngularEvent) {
            event.preventDefault();

            if (this.form.$valid) {
                _jobAnalysisGateAway.save(this.jobAnalysis)
                    .$promise
                    .then((response: any) => {
                        _currentAnalyses.set(
                            _currentAnalyses.get()
                                .concat([response])
                        );
                        this.setJobAnalysis();
                        $state.transitionTo('home.job-analysis.list');
                    }, fail);
            }

            function fail(error: any) {
                _errorDialog.setError(SAVE_ERROR);
                _errorDialog.displayError();
            }
        }

        private setJobAnalysis() {
            this.jobAnalysis = Object.create(emptyJobAnalysis);
        }
    }

    angular.module('jobAnalysis.controllers')
        .controller(JobAnalysisCreate._NAME_, JobAnalysisCreate);

}
