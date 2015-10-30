'use strict';

import angular = require('angular');

interface IOrganization extends Object {
    orgId: number;
    name: string;
    shortName: string;
    childOrgs?: Array<IOrganization>;
    [key: string]: any;
}

module ja.orgs {
    export var name: string = 'organizations';
    var _resource: any;

    class OrganizationsGateAway {
        static _NAME_: string = 'OrganizationsGateAway';
        static $inject: Array<string> = ['$resource', 'context'];

        constructor(resource: angular.resource.IResourceService,
            context: IContext) {

            this.initResource(resource, context.url);
        }

        query(): angular.resource.IResource<IOrganization> {
            return _resource.query()
                .$promise;
                // .then((organizations: Array<IOrganization>) => {
                //     return this.parse(organizations);
                // });
        }

        private parse(organizations: Array<IOrganization>, group?: string): Array<any> {

            var parsedOrgs: Array<any> = [];
            for (let i = 0; i < organizations.length; i++) {
                let org = angular.extend({}, organizations[i], { parent: group || organizations[i].name });
                parsedOrgs.push(org);
                if (hasChildOrgs(org)) {
                    let childs = this.parse(org.childOrgs, org.name);
                    parsedOrgs = parsedOrgs.concat(childs);
                    delete org.childOrgs;
                    console.log(JSON.stringify(parsedOrgs, null, 2));

                }
            }

            return parsedOrgs;
        }

        private initResource(r: angular.resource.IResourceService, baseurl: string): void {
            _resource = r(baseurl + '/user/org/:id');
        }
    }

    function hasChildOrgs(org: IOrganization): boolean {
        return !!(org.hasOwnProperty('childOrgs') &&
            org.childOrgs && org.childOrgs.length);
    }

    angular.module('organizations', ['ngResource'])
        .service('OrganizationsGateAway', OrganizationsGateAway);
}

export var name = ja.orgs.name;
