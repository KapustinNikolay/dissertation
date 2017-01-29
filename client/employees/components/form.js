/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';
import template from '../templates/form.html'
import _ from 'lodash';

class Controller {
  constructor(employeesService, $scope, alertsService) {
    angular.extend(this, {
      employeesService,
      $scope,
      alertsService
    });

    /*    this.schema = {
     type: 'object',
     required: ['name', 'type'],
     properties: {
     name: {type: 'string', minLength:1 },
     type: {type: 'string', enum:[ 'department', 'employee']},
     actions: {
     type: 'array',
     items: {
     type: 'object',
     properties: {
     type: {type: 'string', default: 'process', enum: [
     'process',
     'function',
     'subFunction',
     'operation'
     ]},
     name: {type: 'string', default: ''},
     t: {type: 'integer', default: 0},
     v: {type: 'integer', default: 1}
     },
     required: ['type', 'name', 'v']
     }
     }
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
     key: 'actions',
     title: 'Действия',
     add: 'Добавить действие',
     condition: "model.type == 'employee'",
     items: [
     {
     title: 'Тип',
     key: 'actions[].type',
     titleMap: {
     "process": "Процесс",
     "function": "Функция",
     "subFunction": "Подфункция",
     "operation": "Операция"
     }
     },
     {
     title: 'Название',
     key: 'actions[].name'
     },
     {
     title: 'Переодичность',
     key: 'actions[].v'
     },
     {
     title: 'Время',
     key: 'actions[].t',
     condition: "model.actions[arrayIndex].type == 'operation'"
     }
     ]
     }
     ];*/
  }

  addToArray(array, item) {
    array.push(item);
  }

  removeFromArray(array, i) {
    array.splice(i, 1);
  }

  save(form) {
    this.$scope.$broadcast('schemaFormValidate');
    form.$setSubmitted(true);
    if (form.$invalid) return;
    let employee = _.merge(this.employee, this.resolve && this.resolve.additional || {});
    this.employeesService.save(employee, (res) => {
      this.success();
    });
  }
}

angular.module('employees').component('employeesForm', {
  template/*'<form name="form">' +
   '<div sf-schema="$ctrl.schema" sf-form="$ctrl.form" sf-model="$ctrl.employee"></div>' +
   '<button class="btn btn-primary" ng-click="$ctrl.save()">Сохранить</button>' +
   '<button class="btn btn-warning helpers-margin-left-5" ng-if="$ctrl.m" ng-click="$ctrl.close()">Отмена</button>' +
   '</form>'*/,
  bindings: {
    employee: '<',
    success: '&'
  },
  controller: ['employeesService', '$scope', 'alertsService', Controller]
});