/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular.module('employees', ['ngResource', 'ui.router']);

require('./services/employeesService');
require('./services/copyPastService');
require('./router');
require('./components/edit');
require('./components/item');
require('./components/form');
require('./components/modal');
require('./components/tree');
require('./components/forms/processes');
require('./components/forms/functions');
require('./components/forms/actions');
require('./components/forms/subFunctions');
require('./components/forms/operations');
require('./components/forms/supOperations');