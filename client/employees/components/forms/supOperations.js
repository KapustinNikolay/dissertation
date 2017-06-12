/**
 * Created by nik on 07.06.17.
 */
import angular from 'angular';
import {ComponentWithArrays} from '../../../common/classes/FormComponent'

class Controller extends ComponentWithArrays {
    constructor() {
        super();
    }

    $doCheck() {
        this.rateError = false;
        const {subOperations} = this;
        if (subOperations && subOperations.length) {
            const rate = subOperations.reduce((val, i) => (val + i.rate), 0);

            if (typeof rate !== 'number' || rate !== 1) {
                this.rateError = true;
            }
        }
    }
}

angular.module('employees').component('formSubOperation', {
    template: `
    <div class="col-sm-12">
        <div class="col-sm-12" ng-if="$ctrl.subOperations.length">
            <ul class="list-group">
                <label class="text-warning">Подоперации</label>
                <div ng-if="$ctrl.subOperations.length == 1" class="text-danger">
                    Минимум 2 подоперации
                </div>
                <li class="list-group-item" 
                    ng-repeat="subOperation in $ctrl.subOperations track by $index"> 
                
                    <div class="row">
                        <div class="col-sm-12">
                            <span class="glyphicon glyphicon-remove list-remove-btn" ng-click="$ctrl.removeFromArray($ctrl.subOperations, $index)"></span>
                        </div>
                        
                        <div class="form-group col-sm-4" ng-class="{'has-error' : !subOperation.name}">
                            <label class="control-label">Название подоперации</label>
                            <input class="form-control" type="text" ng-model="subOperation.name">
                            <div ng-if="!subOperation.name" class="help-block">
                                Введите название
                            </div>
                        </div>
                        
                        <div class="form-group col-sm-4" ng-class="{'has-error' : $ctrl.rateError}">
                            <label class="control-label">Коэффициент</label>
                            <input class="form-control" type="number" ng-model="subOperation.rate">
                            <div ng-if="$ctrl.rateError" class="help-block">
                                Коэффициенты в сумме должны быть равны 1
                            </div>
                        </div>
                        
                        <div class="form-group col-sm-12">
                            <ul class="list-group">
                                <label class="text-warning">Задачи</label>
                                <li class="list-group-item" 
                                    ng-repeat="item in subOperation.items track by $index">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <span class="glyphicon glyphicon-remove list-remove-btn" ng-click="$ctrl.removeFromArray(subOperation.items, $index)"></span>
                                        </div>
                                        <form-operation operation="item" form="$ctrl.form"></form-operation>
                                    </div>    
                                </li>
                            </ul>
                        </div>
                        
                        <div class="form-group col-sm-12">                                   
                            <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray(subOperation.items, {})">Добавить задачу</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `,
    bindings: {
        subOperations: '='
    },
    controller: [Controller]
});