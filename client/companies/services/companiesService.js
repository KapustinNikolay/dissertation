/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular
  .module('companies')
  .service('companiesService', ['$resource', ($resource) => $resource('api/companies/:id/:action',
    {id: '@_id', action: '@action'},
    {
      save: {method: 'POST'},
      getTree: {
        method: 'GET',
        params: {action: 'tree'}
      }
    })
  ]);
