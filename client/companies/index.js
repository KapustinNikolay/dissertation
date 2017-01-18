/**
 * Created by nik on 11.01.17.
 */
import angular from 'angular';

angular.module('companies', ['ngResource', 'ui.router']);

require('./router');
require('./services/companiesService');

require('./components/main');
require('./components/edit');
require('./components/item');
require('./components/form');
require('./components/modal');

require('./directives/ogrChart');