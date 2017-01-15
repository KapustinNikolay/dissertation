/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';
import template from '../templates/modal.html';

angular.module('employees').component('employeesModal', {
  template,
  controller: function () {
    this.m = true;
    this.employee = {};
  },
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
});