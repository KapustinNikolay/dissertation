/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/employeesEdit.html';
import EmployeeModal from '../../common/classes/employeeModal';


class Controller extends EmployeeModal {
  constructor(employeesService, $state, $stateParams, $uibModal) {
    super();
    angular.extend(this, {
      employeesService,
      $state,
      $stateParams,
      $uibModal
    });
  }
  $onInit() {
    this.employee.$promise.then((employee) => {
      this.parent = employee._id;
      this.companyId = employee.company;
    });
  }
  save() {
    alert('Сохранено');
  }
}

angular.module('employees').component('employeesEdit', {
  template,
  bindings: {
    employee: '<'
  },
  controller: ['employeesService', '$state', '$stateParams', '$uibModal', Controller]
});