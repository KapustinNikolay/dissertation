/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';
import _ from 'lodash';
import template from '../templates/modal.html';

class Controller {
  constructor(employeesService, $scope) {
    angular.extend(this, {
      employeesService,
      $scope
    });

    this.employee = {};

    this.schema = {
      type: 'object',
      required: ['name', 'type'],
      properties: {
        name: {type: 'string', minLength:1 },
        type: {type: 'string', enum:[ 'department', 'employee']}
      }
    };

    this.form = [
      {
        key: 'name',
        title: 'Имя'
      },
      {
        key: 'type',
        title: 'Тип орг. единицы',
        type: "select",
        titleMap: {
          "department": "Отдел",
          "employee": "Сотрудник"
        }
      }
    ];
  }
  save() {
    this.$scope.$broadcast('schemaFormValidate');
    if (this.$scope.form.$valid) {
      let employee = _.merge(this.employee, this.resolve && this.resolve.additional || {});
      this.employeesService.save(employee, () => {
        this.close();
      });
    }
  }
}

angular.module('employees').component('employeesModal', {
  template,
  controller: ['employeesService', '$scope', Controller],
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
});