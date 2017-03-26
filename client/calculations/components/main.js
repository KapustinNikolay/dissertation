/**
 * Created by nik on 25.03.17.
 */
import angular from 'angular';
import template from '../templates/calculations.html';
import _ from 'lodash';

class Controller {
  constructor(calculationsService) {
    this.calculationsService = calculationsService;
  }

  $onInit() {
    this.calculationsService.get((result) => {
      this.structureAnalysis = result.structureAnalysis;
      this.structureAnalysisRec = _.minBy(this.structureAnalysis, i => Math.abs(i.a - i.b));

      this.smoAnalysis = result.smoAnalysis;
    });
  }
}

angular.module('calculations').component('calculations', {
  template,
  controller: ['calculationsService', Controller]
});