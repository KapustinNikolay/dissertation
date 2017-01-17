/**
 * Created by nik on 11.01.17.
 */
import angular from 'angular';

angular.module('companies')
.config(['$urlRouterProvider', '$stateProvider',
  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/companies/list');
    $urlRouterProvider.when('/companies', '/companies/list');

    $stateProvider
      .state('companies', {
        url: '/companies',
        template: '<div ui-view></div>',
      })
      .state('companies.list', {
        url: '/list',
        template: '<companies list="$resolve.list"></companies>',
        resolve: {
          list: ['companiesService', (companiesService) => {
            return companiesService.query();
          }]
        }
      })
      .state('companies.edit', {
        url: '/update?id',
        template: '<companies-edit company="$resolve.company"></companies-edit>',
        resolve: {
          company: ['companiesService', '$stateParams', (companiesService, $stateParams) => {
            const id = $stateParams.id;
            return id ? companiesService.get({id: id}).$promise : {};
          }]
        }
      });
  }
]);