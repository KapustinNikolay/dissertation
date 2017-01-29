/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/employeesEdit.html';


class Controller {
  constructor(alertsService) {
    this.alertsService = alertsService;
  }
  save() {
    this.alertsService.add('Сохранено успешно');
  }
}

angular.module('employees').component('employeesEdit', {
  template,
  bindings: {
    employee: '<'
  },
  controller: ['alertsService', Controller]
});