/**
 * Created by nik on 24.03.17.
 */
import { Router } from 'express';
import wrap from 'co-express';

import {calculate} from './lib';

const router = Router();

router.get('/', wrap(function* (req, res) {
  const {user} = req;
  const result = yield calculate(user._id);
  res.json(result);
}));

export default router;
