import 'jquery';
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
import './companies';
import './employees'
import './common';

require('./styles/index.scss');

angular.module('myApp', [
  uiRouter,
  ngResource,
  uiBootstrap,
  schemaForm.name,
  'companies',
  'employees',
  'common'
]);