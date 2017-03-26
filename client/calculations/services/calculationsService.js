/**
 * Created by nik on 25.03.17.
 */
import angular from 'angular';

angular
  .module('calculations')
  .service('calculationsService', ['$resource', ($resource) => $resource('api/calculations',
    {},
    {})
  ]);