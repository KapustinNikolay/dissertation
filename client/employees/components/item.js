/**
 * Created by nik on 13.01.17.
 */
import angular from 'angular';
import template from '../templates/employeesItem.html';

angular.module('companies').component('employeesItem', {
  template,
  bindings: {
    item: '<'
  }
});