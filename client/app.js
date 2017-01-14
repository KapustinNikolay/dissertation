import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import './companies';
import './employees'


angular.module('myApp', [
  uiRouter,
  ngResource,
  'companies',
  'employees'
]);
