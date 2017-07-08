/**
 * Created by nik on 18.01.17.
 */
import angular from 'angular';

function dir($state, $uibModal, copyPastService, alertsService, employeesService) {
    return {
        restrict: "E",
        scope: {
            data: '='
        },
        template: '<div></div>',
        link: function (scope, element) {
            const company = scope.data.company || scope.data._id;
            $(element).orgchart({
                'data': scope.data,
                'nodeContent': 'title',
                'pan': true,
                'direction': 't2b',
                'exportButton': true,
                'exportFilename': scope.data.name,
                createNode: ($node, data) => {
                    $node.find('.edge').remove();

                    if (copyPastService.isCopyMode()) {
                        if (data._id !== company) {

                            $node.on('click', () => {
                                copyPastService.copyEmployee(data._id, () => {
                                    alertsService.add('Орг структура клонирована');
                                    $state.reload();
                                });
                            });
                        }
                        return false;
                    }

                    if (data._id !== company) {
                        $node.on('click', () => {
                            $state.go('employees.edit', {id: data._id});
                        });
                    }

                    const secondMenuIcon = $('<i>', {
                        'class': 'fa fa-plus employee-btn employee-btn-add',
                        click: function (e) {
                            e.stopPropagation();
                            const modalInstance = $uibModal.open({
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

                    $node.append(secondMenuIcon);
                    if (data._id !== company) {
                        const copyBtn = $('<i>', {
                            'class': 'fa fa-files-o employee-btn employee-btn-copy',
                            click: (e) => {
                                e.stopPropagation();
                                copyPastService.setCopyEmployee(data._id);
                                $state.reload();
                            }
                        });
                        $node.append(copyBtn);

                        const removeBtn = $('<i>', {
                            'class': 'fa fa-trash employee-btn employee-btn-remove',
                            click: (e) => {
                                e.stopPropagation();
                                employeesService.remove({id: data._id}, function () {
                                    $state.reload();
                                });
                            }
                        });
                        $node.append(removeBtn);
                    }
                }

            });
            $(element).find('.oc-export-btn').text('Экспортировать')
        }
    }
}

angular.module('common').directive('orgChart', ['$state', '$uibModal', 'copyPastService', 'alertsService', 'employeesService', dir]);