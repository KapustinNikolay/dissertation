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

angular.module('employees').component('formSubFunction', {
    template: `
    <div class="col-sm-12">
        <div class="form-group col-sm-4" ng-class="{'has-error' : !$ctrl.subFunction.name}">
            <label class="control-label">Название подфункции</label>
            <input class="form-control" type="text" ng-model="$ctrl.subFunction.name">
            <div ng-if="!$ctrl.subFunction.name" class="help-block">
                Введите название
            </div>
        </div>
        <div class="form-group col-sm-4" ng-class="{'has-error' : !$ctrl.subFunction.v}">
            <label class="control-label">Периодичность</label>
            <input class="form-control" type="number" ng-model="$ctrl.subFunction.v">
            <div ng-if="!$ctrl.subFunction.v" class="help-block">
                Периодичность должна быть положительным числом
            </div>
        </div>
        <div class="col-sm-12" ng-if="$ctrl.subFunction.operations.length">
            <ul class="list-group">
                <label class="text-warning">Операции</label>
                <li class="list-group-item" 
                    ng-repeat="operation in $ctrl.subFunction.operations track by $index"> 
                
                    <div class="row">
                        <div class="col-sm-12">
                            <span class="glyphicon glyphicon-remove list-remove-btn" ng-click="$ctrl.removeFromArray($ctrl.subFunction.operations, $index)"></span>
                        </div>
                        <form-operation operation="operation" form="$ctrl.form"></form-operation>
                    </div>
                </li>
            </ul>
        </div>
        <div class="form-group col-sm-12">                                   
            <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray($ctrl.subFunction.operations, {subOperations:[]})">Добавить операцию</div>
        </div>
    </div>
    `,
    bindings: {
        subFunction: '='
    },
    controller: [Controller]
});