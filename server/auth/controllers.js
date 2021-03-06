/**
 * Created by nik on 14.01.17.
 */
import passport from './pasport';

export function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('login');
  }
}

export function login(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  passport.authenticate('local', (err, user, info) => {
      if (err) {
        return console.error(err);
      }

      if (!user) {
        return res.render('login', info);
      }

      req.login(user, function(err) {
        if (err) {
          console.error(err);
        } else {
          res.redirect('/');
        }
      });
    }
  )(req, res);
}