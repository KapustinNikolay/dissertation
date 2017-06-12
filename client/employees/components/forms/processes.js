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
        this.processes = this.processes || [];
    }
}

angular.module('employees').component('formProcesses', {
    template: `
        <div class="col-sm-12">
        <ul class="list-group list-group-item form-group">
            <label class="col-xs-12 text-warning">Процессы</label>
            <li class="list-group-item col-xs-12"
                ng-repeat="process in $ctrl.processes track by $index">
                
                <div class="row">
                    <div class="col-sm-12">
                        <span class="glyphicon glyphicon-remove list-remove-btn" 
                        ng-click="$ctrl.removeFromArray($ctrl.processes, $index)"></span>
                    </div>
                    <div class="form-group col-sm-4" ng-class="{'has-error' : !process.name}">
                        <label class="control-label">Название процесса</label>
                        <input class="form-control" type="text" ng-model="process.name">
                        <div ng-if="!process.name" class="help-block">
                            Введите название
                        </div>
                    </div>

                    <div class="form-group col-sm-4" ng-class="{'has-error' : !process.v}">
                        <label class="control-label">Периодичность</label>
                        <input class="form-control" type="number" ng-model="process.v">
                        <div ng-if="!process.v" class="help-block">
                            Периодичность должна быть положительным числом
                        </div>
                    </div>
                </div>
                <form-functions functions="process.functions" form="$ctrl.form"></form-functions>
                <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray(process.functions, {actions: []})">Добавить функцию</div>
            </li>
       
            <div type="button" class="btn btn-link" ng-click="$ctrl.addToArray($ctrl.processes, {})">Добавить процесс</div>
        </ul>
    </div>
    `,
    bindings: {
        processes: '='
    },
    controller: [Controller]
});