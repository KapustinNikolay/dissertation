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

angular.module('employees').component('formActions', {
    template: `
    <ul class="list-group">
        <label class="text-warning">Подфункции и операции</label>
        <li class="list-group-item"
            ng-repeat="action in $ctrl.actions track by $index">
            
            <div class="row">
                <div class="col-sm-12">
                    <span class="glyphicon glyphicon-remove list-remove-btn" ng-click="$ctrl.removeFromArray($ctrl.actions, $index)"></span>
                </div>
                <form-operation ng-if="action.type == 'operation'" operation="action"></form-operation>
                <form-sub-function ng-if="action.type == 'subFunction'" sub-function="action"></form-sub-function>
            </div>
        </li>
    </ul>
    `,
    bindings: {
        actions: '='
    },
    controller: [Controller]
});