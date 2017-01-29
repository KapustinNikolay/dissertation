/**
 * Created by nik on 29.01.17.
 */
import angular from 'angular';
import template from '../templates/alerts.html';

const alertInterval = 2000;

class Controller {
  constructor($timeout, alertsService) {
    this.$timeout = $timeout;
    this.alertsService = alertsService;
    this.alerts = [];
  }

  closeAlert(index) {
    this.alerts.splice(index, 1);
  }

  add(msg) {
    const index = this.alerts.push({msg, type: 'success'});
    this.$timeout(() => {
      this.closeAlert(index - 1);
    }, alertInterval);
  }

  addError(msg) {
    this.alerts.push({msg, type: 'danger'});
  }
  
  $onInit() {
    this.alertsService.add = (msg) => {
      this.add(msg);
    };

    this.alertsService.addError = (msg) => {
      this.addError(msg);
    };
  }
}

angular.module('common')
  .component('alerts', {
  template,
  controller: ['$timeout', 'alertsService', Controller]
})
  .service('alertsService', () => ({}));