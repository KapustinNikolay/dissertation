/**
 * Created by nik on 25.03.17.
 */
import angular from 'angular';

angular.module('calculations')
  .config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
      $stateProvider
        .state('calculations', {
          url: '/calculations',
          template: '<div ui-view></div>',
        })
        .state('calculations.main', {
          url: '/',
          template: '<calculations></calculations>'
        })
          .state('calculations.employee', {
          url: '/:id',
          template: '<employee-calculations></employee-calculations>'
        });
    }
  ]);