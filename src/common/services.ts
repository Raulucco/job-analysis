'use strict';

import $ = require('jquery');
import angular = require('angular');

interface ICommonModal extends angular.IAugmentedJQuery {
    modal(): JQuery;
}

interface IErrorDialog {
      message: string;
      title: string;
}

module common.services {

    var template = require('./error-dialog.html');
    var $window: angular.IWindowService;
    var $template: ICommonModal;
    var $app: JQuery;

    interface IErrorScope extends angular.IScope {
        message: string;
        title: string;
        setError(): void;
        displayError(): void;
    }

    class ErrorNotifier implements IErrorDialog {

        static _NAME_: string = 'common.errorNotifier';
        static $inject: Array<string> = ['$window'];

        message: string;
        title: string;

        constructor(
            window: angular.IWindowService) {

            $window = window;
            $app = $('*[ng-app]');
        }

        setError(message: string): void {
            this.message = message;
        }

        setTitle(title: string): void {
            this.title = title;
        }

        displayError(): void {
            $($window.document).on('hidden.bs.modal', () => {
                $template.remove();
                $template = null;
                this.message = null;
                this.title = null;
                $($window.document).off('hidden.bs.modal');
            });

            template = template.replace(/__message__/, this.message);

            if (this.title) {
                template = template
                    .replace(/class="(.+-?)*\s?hidden\s?"/, 'class="$1"')
                    .replace(/__title__/, this.title);
            }

            $template = angular.element(template);
            $app.append($template);
            $template.modal();
        }
    }

    angular.module('common').service(ErrorNotifier._NAME_, ErrorNotifier);
}
