/**
 * Created by nik on 24.03.17.
 */
import {Router} from 'express';
import wrap from 'co-express';

import {calculate, exportCvs} from './lib';

const router = Router();

router.get('/', wrap(function*(req, res) {
    const {user} = req;
    const result = yield calculate(user._id);
    res.json(result);
}));

router.get('/cvs-export', wrap(function*(req, res) {
    const {user} = req;
    const result = yield exportCvs(user._id);

    res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-16le; header=present;'
    });
    res.write(result);
    res.end();
}));

export default router;
