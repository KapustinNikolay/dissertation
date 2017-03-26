window.jQuery = window.$ = require('jquery');
import 'font-awesome/css/font-awesome.css';
import 'orgchart';
import 'orgchart/dist/css/jquery.orgchart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import uiBootstrap from 'angular-ui-bootstrap';

import 'angular-sanitize';
import 'tv4';
import 'objectpath';
import schemaForm from 'angular-schema-form';
import 'script!angular-schema-form-bootstrap';
import 'angular-loading-bar';
import 'angular-animate';

import './companies';
import './employees'
import './common';
import './calculations';

require('angular-loading-bar/build/loading-bar.css');
require('./styles/index.scss');


angular.module('myApp', [
  uiRouter,
  ngResource,
  uiBootstrap,
  schemaForm.name,
  'ngAnimate',
  'angular-loading-bar',
  'companies',
  'employees',
  'common',
  'calculations'
])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = true;
  }]);