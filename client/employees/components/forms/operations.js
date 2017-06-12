/**
 * Created by nik on 07.06.17.
 */
import angular from 'angular';
import {ComponentWithArrays} from '../../../common/classes/FormComponent'

class Controller extends ComponentWithArrays {
    constructor() {
        super();
    }
}

angular.module('employees').component('formOperation', {
    template: `
    <div class="col-sm-12">
    
        <div class="form-group col-sm-4" ng-class="{'has-error' : !$ctrl.operation.name}">
            <label class="control-label">Название операции</label>
            <input class="form-control" type="text" ng-model="$ctrl.operation.name">
            <div ng-if="!$ctrl.operation.name" class="help-block">
                Введите название
            </div>
        </div>
        <div class="form-group col-sm-4" ng-class="{'has-error' : !$ctrl.operation.v}">
            <label class="control-label">Периодичность</label>
            <input class="form-control" type="number" ng-model="$ctrl.operation.v">
            <div ng-if="!$ctrl.operation.v" class="help-block">
                Периодичность должна быть положительным числом
            </div>
        </div>
        <div class="form-group col-sm-4" ng-class="{'has-error' : !$ctrl.operation.t}">
            <label class="control-label">Время выполнения (мин)</label>
            <input class="form-control" type="number" ng-model="$ctrl.operation.t">
            <div ng-if="!$ctrl.operation.t" class="help-block">
                Время должно быть положительным числом
            </div>
        </div>
        <div ng-if="$ctrl.operation.subOperations" class="form-group">
        <form-sub-operation sub-operations="$ctrl.operation.subOperations"></form-sub-operation>
        <div class="form-group col-sm-12">                                   
            <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray($ctrl.operation.subOperations, {items:[]})">Добавить подоперацию</div>
        </div>
        </div>
    </div>
    `,
    bindings: {
        operation: '='
    },
    controller: [Controller]
});