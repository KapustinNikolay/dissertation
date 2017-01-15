/**
 * Created by nik on 12.01.17.
 */
import angular from 'angular';

angular.module('employees', ['ngResource', 'ui.router']);

require('./services/employeesService');
require('./router');
require('./components/edit');
require('./components/item');
require('./components/form');
require('./components/modal');