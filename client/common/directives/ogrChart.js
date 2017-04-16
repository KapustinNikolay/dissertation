/**
 * Created by nik on 18.01.17.
 */
import angular from 'angular';

function dir($state, $uibModal) {
    return {
        restrict: "E",
        scope: {
            data: '='
        },
        template: '<div></div>',
        link: function (scope, element) {
            const company = scope.data.company || scope.data._id;
            console.log(scope.data)
            $(element).orgchart({
                'data': scope.data,
                'nodeContent': 'title',
                'pan': true,
                'direction': 't2b',
                'exportButton': true,
                'exportFilename': scope.data.name,
                createNode: ($node, data) => {

                    if (data._id !== company) {
                        $node.on('click', () => {
                            $state.go('employees.edit', {id: data._id});
                        });
                    }

                    const secondMenuIcon = $('<i>', {
                        'class': 'fa fa-plus employee-add-btn',
                        click: function (e) {
                            e.stopPropagation();
                            var modalInstance = $uibModal.open({
                                animation: true,
                                component: 'employeesModal',
                                resolve: {
                                    additional: () => {
                                        return {
                                            company: company,
                                            parent: company !== data._id ? data._id : undefined
                                        }
                                    }
                                }
                            });
                            modalInstance.result.then(() => {
                                $state.reload();
                            }, () => {
                            });
                        }
                    });

                    $node.append(secondMenuIcon).find('.edge').remove();
                }
            });
            $(element).find('.oc-export-btn').text('Экспортировать')
        }
    }
}

angular.module('common').directive('orgChart', ['$state', '$uibModal', dir]);