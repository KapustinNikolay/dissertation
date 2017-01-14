/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular
  .module('companies')
  .service('companiesService', ['$resource', ($resource) => $resource('api/companies/:id',
    {id: '@_id'},
    {
      save: {method: 'POST'}
    })
  ]);
