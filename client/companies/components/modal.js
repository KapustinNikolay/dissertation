/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';
import template from '../templates/modal.html';

angular.module('companies').component('companiesModal', {
  template,
  controller: function () {
    this.m = true;
    this.company = {};
  },
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
});