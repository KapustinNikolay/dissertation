/**
 * Created by nik on 11.01.17.
 */
import angular from 'angular';
import template from '../templates/companies.html';

class Controller {
  constructor($uibModal, $state) {
    angular.extend(this, {
      $uibModal,
      $state
    });
  }
  
  openModal() {
    var modalInstance = this.$uibModal.open({
      animation: true,
      component: 'companiesModal'
    });

    modalInstance.result.then(() => {
      this.$state.reload();
    },() => {

    });
  }
}

angular.module('companies').component('companies', {
  template,
  bindings: {
    list: '<'
  },
  controller: ['$uibModal', '$state', Controller]
});