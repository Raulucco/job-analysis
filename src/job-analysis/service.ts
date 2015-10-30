'use strict';
import angular = require('angular');

export var name = 'jobAnalysis.services';

module jobAnalysis.service {
    var _resource: IResourceClassGateAway;
    var $resource: angular.resource.IResourceService;
    var _context: IContext;

    class JobAnalysis implements IJobAnalysis {
        description: string;
        name: string;
        orgId: number;
        pdId: number;
        pdNumber: string;
        pdTitle: string;

        constructor() {
            this.description = null;
            this.name = null;
            this.orgId = null;
            this.pdId = null;
            this.pdNumber = null;
            this.pdTitle = null;
        }
    }

    export class CurrentJobAnalysis implements IHydrator {

        static _NAME_: string = 'currentJobAnalysis';
        static $inject: Array<string> = ['emptyJobAnalysis'];

        private jobAnalysis: IJobAnalysis;

        /*{
            id: null,
            description: null,
            name: null,
            created: null,
            orgId: null,
            pdId: null,
            pdNumber: null,
            pdTitle: null
        };*/

        constructor(emptyJobAnalysis: IJobAnalysis) {
            this.jobAnalysis = Object.create(emptyJobAnalysis);
        }

        private empty: boolean = true;

        hydrate(chosenJobAnalysis: IJobAnalysis) {
            for (var key in chosenJobAnalysis) {
                if (chosenJobAnalysis.hasOwnProperty(key)) {
                    this.jobAnalysis[key] = chosenJobAnalysis[key];
                }
            }

            this.updateState();
        }

        flush() {
            for (var key in this.jobAnalysis) {
                if (this.jobAnalysis.hasOwnProperty(key)) {
                    this.jobAnalysis[key] = null;
                }
            }

            this.updateState();
        }

        get(): IJobAnalysis {
            return !this.empty ? Object.create(this.jobAnalysis) : null;
        }

        isEmpty(): boolean {
            return this.empty;
        }

        private updateState(): void {
            this.empty = !this.empty;
        }

    }

    class CurrentAnalyses implements IRegister, IObserver {
        static _NAME_: string = 'currentAnalyses';
        private analyses: Array<IJobAnalysis>;
        public observers: Array<IObserver> = [];

        update(analysis: IJobAnalysis): void {
            for (let i = 0; i < this.analyses.length; i++) {
                if (this.analyses[i].id === analysis.id) {
                    this.analyses[i] = analysis;
                    break;
                }
            }
            this.notify();
        }

        set(analyses: Array<IJobAnalysis>): void {
            this.analyses = analyses;
            this.notify();
        }

        get(): Array<IJobAnalysis> {
            return this.analyses;
        }

        notify() {
            for (let i = 0; i < this.observers.length; i++) {
                this.observers[i].notify();
            }
        }

        register(observer: IObserver): void {
            this.observers.push(observer);
        }

        deregister(observer: IObserver): void {
            for (let i = 0; i < this.observers.length; i++) {
                if (observer === this.observers[i]) {
                    this.observers.splice(i, 1);
                    break;
                }
            }
        }

    }

    export class JobAnalysisGateAway implements IGateAwayService<IJobAnalysis> {
        static $inject: string[] = ['$resource', 'context'];
        static _NAME_: string = 'JobAnalysisGateAway';

        constructor(resource: ng.resource.IResourceService, context: IContext) {
            $resource = resource;
            _context = context;
        }

        initResource(): void {
            _resource = <IResourceClassGateAway>$resource(
                _context.url + '/jobAnalysis/:id',
                { id: '@id' },
                {
                    update: {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    create: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                }
            );
        }

        query(): angular.resource.IResourceArray<IResourceJobAnalysis> {

            return _resource.query(success, fail);

            function success(response: any) {
                return response.analysises;
            }

            function fail(error: any) {
                throw error;
            }
        }

        update(analysis: IJobAnalysis): angular.resource.IResource<IJobAnalysis> {
            return _resource.update({id: analysis.id}, analysis);
        }

        save(analysis: IJobAnalysis): angular.resource.IResource<IJobAnalysis> {
            return _resource.create({}, analysis);
        }

        get(analysis: IJobAnalysis): angular.resource.IResource<IJobAnalysis> {
            return _resource.get({ id: analysis.id });
        }

        remove(analysis: IJobAnalysis): angular.resource.IResource<IJobAnalysis> {
            return _resource.remove(analysis);
        }
    }

    class CurrentJobAnalysesFacade implements IJobAnalysisFacade {

        static _NAME_: string = 'currentJobAnalysesFacade';
        static $inject: Array<string> = [CurrentJobAnalysis._NAME_,
            CurrentAnalyses._NAME_, JobAnalysisGateAway._NAME_];

        constructor(private currentAnalysis: CurrentJobAnalysis,
            private currentAnalyses: CurrentAnalyses,
            private gateAway: JobAnalysisGateAway) { }

        getCurrentAnalyses(): Array<IJobAnalysis> {
            return this.currentAnalyses.get();
        }

        getCurrentAnalysis(): IJobAnalysis {
            return this.currentAnalysis.get();
        }

        addAnalysisToList(analysis: IJobAnalysis) {
            let analyses: Array<IJobAnalysis> = this.getCurrentAnalyses();
            analyses.push(analysis);
            this.currentAnalyses.set([].concat(analyses));
        }

        subscribeToAnalyses(listerner: IObserver): void {
            this.currentAnalyses.register(listerner);
        }

        unsubscribeToAnalyses(listener: IObserver): void {
            this.currentAnalyses.deregister(listener);
        }

        setChosenJobAnalysis(analysis: IJobAnalysis): void {
            this.currentAnalysis.hydrate(analysis);
        }

        setChosenJobAnalyses(analyses: Array<IJobAnalysis>): void {
            this.currentAnalyses.set(analyses);
        }

        flushChosenJobAnalysis(): void {
            this.currentAnalysis.flush();
        }

    }

    angular.module(name, ['ngResource'])
        .constant('emptyJobAnalysis', new JobAnalysis())
        .service(JobAnalysisGateAway._NAME_, JobAnalysisGateAway)
        .service(CurrentJobAnalysis._NAME_, CurrentJobAnalysis)
        .service(CurrentAnalyses._NAME_, CurrentAnalyses)
        .service(CurrentJobAnalysesFacade._NAME_, CurrentJobAnalysesFacade);
    ;
}
