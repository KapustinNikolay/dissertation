/**
 * Created by nik on 15.01.17.
 */
import angular from 'angular';
import template from '../templates/naivgation.html';

class Controller {
  constructor($state) {
  }
}

angular.module('common').component('navigation', {
  template,
  controller: ['$state', Controller]
});