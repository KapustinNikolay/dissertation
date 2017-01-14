/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';
import template from '../templates/companiesEdit.html';

class Controller {
  constructor(companiesService, $state, $stateParams) {
    angular.extend(this, {
      companiesService,
      $state,
      $stateParams
    });
  }
  save() {
    this.companiesService.save({id: this.$stateParams.id}, this.company, (res) => {
      if (res.id) {
        this.$state.go('companies.edit', {id: res._id});
      }
    });
  }
}

angular.module('companies').component('companiesEdit', {
  template,
  bindings: {
    company: '<'
  },
  controller: ['companiesService', '$state', '$stateParams', Controller]
});