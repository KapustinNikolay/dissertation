/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';
import template from '../templates/form.html'
import _ from 'lodash';

class Controller {
  constructor(employeesService, $scope, alertsService) {
    angular.extend(this, {
      employeesService,
      $scope,
      alertsService
    });

  }

  addToArray(array, item) {
    array.push(item);
  }

  removeFromArray(array, i) {
    array.splice(i, 1);
  }

  save(form) {
    this.$scope.$broadcast('schemaFormValidate');
    form.$setSubmitted(true);
    if (form.$invalid) return;
    let employee = _.merge(this.employee, this.resolve && this.resolve.additional || {});
    this.employeesService.save(employee, (res) => {
      this.success();
    });
  }
}

angular.module('employees').component('employeesForm', {
  template,
  bindings: {
    employee: '<',
    success: '&'
  },
  controller: ['employeesService', '$scope', 'alertsService', Controller]
});