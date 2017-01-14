/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/employeesEdit.html';
import _ from 'lodash';

class Controller {
  constructor(employeesService, $state, $stateParams) {
    angular.extend(this, {
      employeesService,
      $state,
      $stateParams
    });
  }
  save() {
    if (this.$stateParams.id) {
      this.employeesService.update({id: this.$stateParams.id}, this.employee, (res) => {
        alert('ok');
      });
    } else {
      let employee = this.employee;
      _.merge(employee, this.$stateParams);
      this.employeesService.create({}, employee, (res) => {
        this.$state.go('employees.edit', {id: res._id});
      });
    }

  }
}

angular.module('employees').component('employeesEdit', {
  template,
  bindings: {
    employee: '<'
  },
  controller: ['employeesService', '$state', '$stateParams', Controller]
});