/**
 * Created by nik on 22.04.17.
 */
import angular from 'angular';
const STORAGE_NAME = 'cpopy_employee_id';

angular
    .module('employees')
    .service('copyPastService', ['employeesService', (employeesService) => ({

        setCopyEmployee(_id) {
            localStorage.setItem(STORAGE_NAME, _id);
        },

        isCopyMode() {
            return !!localStorage.getItem(STORAGE_NAME);
        },

        clearCopyEmployee() {
            localStorage.clear(STORAGE_NAME);
        },

        copyEmployee(targetId, cb) {
            const copyEmployee = localStorage.getItem(STORAGE_NAME);
            employeesService.cloneEmployee({id: targetId}, {copyEmployee}, () => {
                this.clearCopyEmployee();
                if (cb) {
                    cb();
                }
            });
        }
})]);