/**
 * Created by nik on 18.06.17.
 */
import angular from 'angular';
import template from '../templates/employeeCalculations.html';
class Controller {
    constructor(calculationsService, stateParams, $timeout) {
        this.calculationsService = calculationsService;
        this.stateParams = stateParams;
        this.$timeout = $timeout;

        this.data = [];
        this.labels = [];
    }

    $onInit() {
        this.calculationsService.get(this.stateParams, (result) => {
            Object.assign(this, result);
            const {calculations} = result;
            calculations.forEach(i => {
                this.labels.push(i.name);
                this.data.push(i._p);
            });
        });
    }
}

angular.module('calculations').component('employeeCalculations', {
    template,
    controller: ['calculationsService', '$stateParams', '$timeout', Controller]
});