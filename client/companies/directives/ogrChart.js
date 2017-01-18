/**
 * Created by nik on 18.01.17.
 */
import angular from 'angular';

function dir($state) {
  return {
    restrict: "E",
    scope: {
      data: '='
    },
    template: '<div id="orgChart"></div>',
    link: function (scope, element) {
      $(element).orgchart({
        'data' : scope.data,
        'nodeContent': 'title',
        createNode: ($node, data) => {
          $node.on('click', () => {
            console.log(data)
            $state.go('employees.edit', {id: data._id});
          });
        }
      });
    }
  }
}

angular.module('companies').directive('orgChart', ['$state', dir]);