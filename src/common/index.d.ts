///<reference path="../../typings/tsd.d.ts" />

interface IHydrator {
    hydrate<T>(obj: T): void;
    flush(): void;
    get<T>(): T;
}

interface IContext extends Object {
    baseURL?: string;
    serverURL?: string;
    contextURL?: string;
    url: string;
}

interface IGateAwayService<T> {
    query<T>(): Array<T>;
    get<T>(obj: T): angular.resource.IResource<T>;
    remove<T>(obj: T): angular.resource.IResource<T>;
    update<T>(data: T): angular.resource.IResource<T>;
    save<T>(data: T): angular.resource.IResource<T>;
    initResource(): void;
}

interface IJobAnalysis {
    id?: number;
    description: string;
    name: string;
    created?: string;
    orgId: number;
    pdId: number;
    pdNumber: string;
    pdTitle: string;
    [key: string]: any;
}

interface IObserver {
    notify(): void;
}

interface IRegister {
    observers: Array<IObserver>;
    register(observer: IObserver): void;
}

interface IDeregister {
    observers: Array<IObserver>;
    deregister(observer: IObserver): void;
}

interface IResourceJobAnalysis extends
    angular.resource.IResource<IJobAnalysis> {

    update(analysis: IJobAnalysis): angular.resource.IResource<IJobAnalysis>;
}

interface IResourceClassGateAway extends
    angular.resource.IResourceClass<IResourceJobAnalysis> {
    update(params: Object, data: IJobAnalysis): angular.resource.IResource<IJobAnalysis>;
    create(params: Object, data: IJobAnalysis): angular.resource.IResource<IJobAnalysis>;
}

interface IJobAnalysisController {
    analyses: Array<IJobAnalysis>;
}

interface IJobAnalysisFacade {

    getCurrentAnalyses(): Array<IJobAnalysis>;
    getCurrentAnalysis(): IJobAnalysis;
    addAnalysisToList(analysis: IJobAnalysis): void;
    subscribeToAnalyses(listerner: IObserver): void;
    unsubscribeToAnalyses(listener: IObserver): void;
    setChosenJobAnalysis(analysis: IJobAnalysis): void;
    flushChosenJobAnalysis(): void;
    setChosenJobAnalyses(analyses: Array<IJobAnalysis>): void;
}
