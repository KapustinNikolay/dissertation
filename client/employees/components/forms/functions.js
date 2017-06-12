/**
 * Created by nik on 07.06.17.
 */
import angular from 'angular';
import {ComponentWithArrays} from '../../../common/classes/FormComponent'

class Controller extends ComponentWithArrays {
    constructor() {
        super();
    }

    $onInit() {
        this.functions = this.functions || [];
    }
}

angular.module('employees').component('formFunctions', {
    template: `
    <ul class="form-group list-group">
        <label class="text-warning">Функции</label>
            
            <li class="list-group-item"
                ng-repeat="function in $ctrl.functions track by $index">
                
                <div class="row">
                    <div class="col-sm-12">
                        <span class="glyphicon glyphicon-remove list-remove-btn" ng-click="$ctrl.removeFromArray($ctrl.functions, $index)"></span>
                    </div>
                    <div class="form-group col-sm-4" ng-class="{'has-error' : !function.name}">
                        <label class="control-label">Название функции</label>
                        <input class="form-control" type="text" ng-model="function.name">
                        <div ng-if="!function.name" class="help-block">
                            Введите название
                        </div>
                    </div>

                    <div class="form-group col-sm-4" ng-class="{'has-error' : !function.v}">
                        <label class="control-label">Периодичность</label>
                        <input class="form-control" type="number" ng-model="function.v">
                        <div ng-if="!function.v" class="help-block">
                            Периодичность должна быть положительным числом
                        </div>
                    </div>
                </div>
                
                <form-actions actions="function.actions"></form-actions>
                
                <div class="form-inline">
                    <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray(function.actions, {type: 'subFunction', operations: []})">Добавить подфункцию</div>
                    <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray(function.actions, {type: 'operation', subOperations:[]})">Добавить операцию</div>
                </div>
            </li>
    </ul>
    `,
    bindings: {
        functions: '='
    },
    controller: [Controller]
});