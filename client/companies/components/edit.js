/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesEdit.html';

class Controller {
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
  controller: [Controller]
});