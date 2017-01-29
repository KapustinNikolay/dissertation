/**
 * Created by nik on 14.01.17.
 */
import angular from 'angular';

angular.module('common', ['ui.bootstrap']);

require('./components/navigation');
require('./components/alerts');
require('./directives/ogrChart');

require('./interseptors/error');