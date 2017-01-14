/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesItem.html';
require('../styles/companiesItem.scss');

angular.module('companies').component('companiesItem', {
  template,
  bindings: {
    item: '<'
  }
});
