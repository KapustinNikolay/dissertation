/**
 * Created by nik on 12.01.17.
 */
import express from 'express';
import webpack from 'webpack';
import webPackDev from 'webpack-dev-middleware';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionStore from 'connect-mongodb-session';
import path from 'path';
import config from './config';
import webpackConf from '../config/webpack.dev';
import auth from './auth/routes';
import companies from './companies/router';
import employees from './employees/router';
import calculation from './calculation/router';

const router = express.Router();
const SessionStore = sessionStore(session);

if (process.env.NODE_ENV == 'development') {
  router.use(webPackDev(webpack(webpackConf),{noInfo: true}));
} else {
  router.use('/', express.static(path.join(__dirname, '../dist')));
}
router.use('/static', express.static(path.join(__dirname, '../static')));

router.use(cookieParser());
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
var store = new SessionStore({
  uri: config.mongoUrl,
  collection: 'sessions'
});

router.use(session({
  secret: 'Du4345t4i5sdayu435gdfsad9klxx_sdf50&sdf)$^@$jdasd32434FGHPD',
  key: 'session',
  cookie: {maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
  store: store,
  resave: true,
  saveUninitialized: true
}));

router.use(auth);
router.use('/api/companies', companies);
router.use('/api/employees', employees);
router.use('/api/calculations', calculation);

router.get('/', (req, res) => {
  res.render('index');
});

router.use(function (err, req, res, next) {
   if (err) {
     res.status(500).json({error: err.toString()});
   }
});
export default router;