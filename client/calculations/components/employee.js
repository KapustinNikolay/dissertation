/**
 * Created by nik on 18.06.17.
 */
import angular from 'angular';
import template from '../templates/employeeCalculations.html';
class Controller {
    constructor(calculationsService, stateParams) {
        this.calculationsService = calculationsService;
        this.stateParams = stateParams;
    }

    $onInit() {
        this.calculationsService.get(this.stateParams, (result) => {
            Object.assign(this, result);
        });
    }
}

angular.module('calculations').component('employeeCalculations', {
    template,
    controller: ['calculationsService', '$stateParams', Controller]
});