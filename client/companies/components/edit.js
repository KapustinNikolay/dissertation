/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesEdit.html';

class Controller {
  constructor(alertsService) {
    this.alertsService = alertsService;
  }

  save() {
    this.alertsService.add('Сохранено успешно');
  }
}

angular.module('companies').component('companiesEdit', {
  template,
  bindings: {
    company: '<',
    orgChart: '<'
  },
  controller: ['alertsService', Controller]
});