/**
 * Created by nik on 17.01.17.
 */
import angular from 'angular';
import template from '../templates/tree.html';


class Controller {
  constructor(employeesService, $state, $stateParams, $uibModal) {
    angular.extend(this, {
      employeesService,
      $state,
      $stateParams,
      $uibModal
    });

    this.tree = [
      { "name" : "Joe", "age" : "21", "children" : [
        { "name" : "Smith", "age" : "42", "children" : [] },
        { "name" : "Gary", "age" : "21", "children" : [
          { "name" : "Jenifer", "age" : "23", "children" : [
            { "name" : "Dani", "age" : "32", "children" : [] },
            { "name" : "Max", "age" : "34", "children" : [
              { "name" : "Dani", "age" : "32", "children" : [] },
              { "name" : "Max", "age" : "34", "children" : [
                { "name" : "Dani", "age" : "32", "children" : [] },
                { "name" : "Max", "age" : "34", "children" : [
                  { "name" : "Dani", "age" : "32", "children" : [] },
                  { "name" : "Max", "age" : "34", "children" : [
                    { "name" : "Dani", "age" : "32", "children" : [] },
                    { "name" : "Max", "age" : "34", "children" : [
                    ]}
                  ]}
                ]}
              ]}
            ]}
          ]}
        ]}
      ]},
      { "name" : "Albert", "age" : "33", "children" : [] },
      { "name" : "Ron", "age" : "29", "children" : [] }
    ];
  }
  $onInit() {
    this.employeesService.getTree({id: this.company}, (res) => {
      console.log(res)
    });
  }
}

angular.module('employees').component('employeesTree', {
  template,
  bindings: {
    company: '<'
  },
  controller: ['employeesService', '$state', '$stateParams', '$uibModal', Controller]
});