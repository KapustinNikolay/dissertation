/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular
  .module('employees')
  .service('employeesService', ['$resource', ($resource) => $resource('api/employees/:id/:action',
    {id: '@_id', action: '@'},
    {
      save: {method: 'POST'},
      getTree: {
        method: 'GET',
        params: {action: 'tree'}
      }
    })
  ]);
