/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesEdit.html';
import EmployeeModal from '../../common/classes/employeeModal';

class Controller extends EmployeeModal {
  constructor(companiesService, employeesService, $uibModal, $state) {
    super();
    angular.extend(this, {
      companiesService,
      $uibModal,
      employeesService,
      $state
    });
  }
  $onInit() {
    this.company.$promise.then((company) => {
      this.companyId = company._id;
    });
  }
  save() {
    alert('Сохранено');
  }
}

angular.module('companies').component('companiesEdit', {
  template,
  bindings: {
    company: '<',
    orgChart: '<'
  },
  controller: ['companiesService', 'employeesService', '$uibModal', '$state', Controller]
});