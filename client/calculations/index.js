/**
 * Created by nik on 25.03.17.
 */
import angular from 'angular';

angular.module('calculations', ['ngResource', 'ui.router']);

require('./router');
require('./services/calculationsService');
require('./components/main');