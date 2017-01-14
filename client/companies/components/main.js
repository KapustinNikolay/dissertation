/**
 * Created by nik on 11.01.17.
 */
import angular from 'angular';
import template from '../templates/companies.html';

class Controller {
  constructor($timeout) {
  }
}

angular.module('companies').component('companies', {
  template,
  bindings: {
    list: '<'
  },
  controller: ['$timeout', Controller]
});