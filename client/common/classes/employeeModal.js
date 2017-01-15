/**
 * Created by nik on 15.01.17.
 */
export default class {
  openModal() {
    var modalInstance = this.$uibModal.open({
      animation: true,
      component: 'employeesModal',
      resolve: {
        additional: () => {
          return {
            company: this.companyId,
            parent: this.parent
          }
        }
      }
    });

    modalInstance.result.then(() => {
      this.$state.reload();
    },() => {

    });
  }
}