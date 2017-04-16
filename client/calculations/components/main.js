/**
 * Created by nik on 25.03.17.
 */
import angular from 'angular';
import template from '../templates/calculations.html';
class Controller {
    constructor(calculationsService) {
        this.calculationsService = calculationsService;
    }

    $onInit() {
        this.calculationsService.get((result) => {
            Object.assign(this, result);
        });
    }
}

angular.module('calculations').component('calculations', {
    template,
    controller: ['calculationsService', Controller]
});