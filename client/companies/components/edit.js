/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesEdit.html';

class Controller {
    constructor(alertsService, copyPastService, $state) {
        this.$state = $state;
        this.copyPastService = copyPastService;
        this.alertsService = alertsService;
        this.isCopyMode = copyPastService.isCopyMode();
    }

    exitCopyMode() {
        this.copyPastService.clearCopyEmployee();
        this.$state.reload();
    }

    save() {
        this.alertsService.add('Сохранено успешно');
    }
}

angular.module('companies').component('companiesEdit', {
    template,
    bindings: {
        company: '<',
        orgChart: '<'
    },
    controller: ['alertsService', 'copyPastService', '$state', Controller]
});