/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';

class Controller {
  constructor(companiesService, $state, $scope) {
    angular.extend(this, {
      companiesService,
      $state,
      $scope
    });

    this.schema = {
      type: 'object',
      required: ['name'],
      properties: {
        name: {type: 'string', minLength:1 }
      }
    };

    this.form = [
      {
        key: 'name',
        title: 'Название'
      }
    ];
  }

  save() {
    this.$scope.$broadcast('schemaFormValidate');
    if (this.$scope.form.$valid) {
      this.companiesService.save(this.company, (res) => {
        if (this.m) {
          this.close();
        }
      });
    }
  }
}

angular.module('companies').component('companiesForm', {
  template: '<form name="form">' +
  '<div sf-schema="$ctrl.schema" sf-form="$ctrl.form" sf-model="$ctrl.company"></div>' +
  '<button class="btn btn-primary" ng-click="$ctrl.save()">Сохранить</button>' +
  '<button class="btn btn-warning helpers-margin-left-5" ng-if="$ctrl.m" ng-click="$ctrl.close()">Отмена</button>' +
  '</form>',
  bindings: {
    m: '<',
    company: '<',
    close: '&',
    success: '&'
  },
  controller: ['companiesService', '$state', '$scope',Controller]
});