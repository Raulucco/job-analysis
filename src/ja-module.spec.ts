///<reference path="../typings/tsd.d.ts" />
///<reference path="common/index.d.ts" />
import ja = require('./index');

describe('ja', () => {
    var jobAnalysisCtrl: IJobAnalysisController;
    beforeEach(angular.mock.module(ja.name));

    beforeEach(angular.mock.inject((_$controller_: angular.IControllerService) => {
       jobAnalysisCtrl = <IJobAnalysisController> _$controller_('JobAnalysisCtrl', {});
    }));

    it('It has a list of analysis', () => {
        expect(jobAnalysisCtrl.analyses).toEqual([]);
    });
});
