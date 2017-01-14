/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular
  .module('employees')
  .service('employeesService', ['$resource', ($resource) => $resource('api/employees/:id',
    {id: '@_id'},
    {
      create: {method: 'POST'},
      update: {method: 'PUT'}
    })
  ]);
