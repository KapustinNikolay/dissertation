/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/employeesEdit.html';


class Controller {
  save() {
    alert('Сохранено');
  }
}

angular.module('employees').component('employeesEdit', {
  template,
  bindings: {
    employee: '<'
  },
  controller: [Controller]
});