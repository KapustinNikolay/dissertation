/**
 * Created by nik on 29.01.17.
 */
angular.module('common').factory('errorInterceptor', ['alertsService', '$location', '$q',

    function (alertsService, $location, $q) {
    return {
      'responseError': function (rejection) {
        switch (rejection.status) {
          case 401:
            $timeout(function () {
              $location.path('/logout');
            }, 0, false);
            break;
          case 403:
            $location.url('/');
            break;
          default:
            if (rejection.status == -1 || rejection.status == 0) {
              break;
            }
            alertsService.addError(rejection.data);
            break;
        }
        return $q.reject(rejection);
      }
    };
  }
]).config(['$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
  }
]);