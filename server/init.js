/**
 * Created by nik on 11.01.17.
 */
import express from 'express';
import mongoose from 'mongoose';
import engine from 'ejs-locals';
import config from './config';
import routes from './routes';

global.ENV = process.env.NODE_ENV;

global.mongoUrl = 'mongodb://localhost:27017/diss';
global.PORT = 1945;

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl);

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


/*if (ENV != 'development') {
  require('webpack')(require('../config/webpack.prod'), err => err && console.error(err));
}*/


app.use(routes);
app.listen(PORT);
console.log(`Server started on ${config.PORT} port`);