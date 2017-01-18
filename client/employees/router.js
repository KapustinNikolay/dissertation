/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular.module('employees')
  .config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.when('/employees', '/employees/list');
      $stateProvider
        .state('employees', {
          url: '/employees',
          template: '<div ui-view></div>',
        })
        .state('employees.edit', {
          url: '/update?id?company?parent',
          template: '<employees-edit employee="$resolve.employee"></employees-edit>',
          resolve: {
            employee: ['employeesService','$stateParams', (employeesService, $stateParams) => {
              const {id} = $stateParams;
              return id ? employeesService.get({id}).$promise : {};
            }]
          }
        });
    }
  ]);