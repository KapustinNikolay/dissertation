/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesItem.html';

angular.module('companies').component('companiesItem', {
  template,
  bindings: {
    item: '<'
  }
});
