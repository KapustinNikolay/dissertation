/**
 * Created by nik on 14.01.17.
 */
import express from 'express';
import * as controllers from './controllers';
import passport from './pasport';
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('index');
  }
  res.render('login', {reason: null});
});
router.post('/login', controllers.login);
router.use(controllers.checkAuth);

export default router;