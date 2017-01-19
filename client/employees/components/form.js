/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';
import _ from 'lodash';

class Controller {
  constructor(employeesService, $scope) {
    angular.extend(this, {
      employeesService,
      $scope
    });

    this.schema = {
      type: 'object',
      required: ['name', 'type'],
      properties: {
        name: {type: 'string', minLength:1 },
        type: {type: 'string', enum:['department', 'employee']},
        process: {type: 'string', minLength:1 },
        function: {type: 'string', minLength:1 },
        subFunction: {type: 'string', minLength:1 },
        operation: {type: 'string', minLength:1 }
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
      },
      {
        type: "fieldset",
        condition: "model.type == 'employee'",
        items: [
          {
            key: 'process',
            title: 'Процесс'
          },
          {
            key: 'function',
            title: 'Функция'
          },
          {
            key: 'subFunction',
            title: 'Подфункция'
          },
          {
            key: 'operation',
            title: 'Операция'
          }
        ]
      }
    ];
  }

  save() {
    this.$scope.$broadcast('schemaFormValidate');
    if (this.$scope.form.$valid) {
      let employee = _.merge(this.employee, this.resolve && this.resolve.additional || {});
      this.employeesService.save(employee, (res) => {
        if (this.m) {
          this.close();
        }
        this.success();
      });
    }
  }
}

angular.module('employees').component('employeesForm', {
  template: '<form name="form">' +
  '<div sf-schema="$ctrl.schema" sf-form="$ctrl.form" sf-model="$ctrl.employee"></div>' +
  '<button class="btn btn-primary" ng-click="$ctrl.save()">Сохранить</button>' +
  '<button class="btn btn-warning helpers-margin-left-5" ng-if="$ctrl.m" ng-click="$ctrl.close()">Отмена</button>' +
  '</form>',
  bindings: {
    m: '<',
    employee: '<',
    resolve: '<',
    close: '&',
    success: '&'
  },
  controller: ['employeesService', '$scope', Controller]
});