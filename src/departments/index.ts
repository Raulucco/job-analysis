'use strict';

import angular = require('angular');

module ja.departments {

    export var name: string = 'departments';

    var _resource: any;

    class DepartmentsGateAway {
        static _NAME_: string = 'DepartmentsGateAway';
        static $inject: Array<string> = ['$resource', 'context'];

        constructor(resource: angular.resource.IResourceService,
            context: IContext) {
            this.initResource(resource, context.url);
        }

        private initResource(r: angular.resource.IResourceService, baseurl: string): void {
            _resource = r(baseurl + '/user/org/:orgId/dept/:id');
        }

        query(params: Object): angular.resource.IResource<any> {
            return _resource.query(params);
        }

    }

    angular.module(name, ['ngResource'])
        .service(DepartmentsGateAway._NAME_, DepartmentsGateAway);

}

export var name: string = ja.departments.name;
