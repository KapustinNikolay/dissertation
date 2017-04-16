/**
 * Created by nik on 24.03.17.
 */
import {Router} from 'express';
import wrap from 'co-express';
import iconv from 'iconv';

import {calculate, exportCvs} from './lib';

const router = Router();

router.get('/', wrap(function*(req, res) {
    const {user} = req;
    const result = yield calculate(user._id);
    res.json(result);
}));

router.get('/cvs-export.csv', wrap(function*(req, res) {
    const {user} = req;
    const result = yield exportCvs(user._id);

    res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-16le; header=present;'
    });
    const body = new Buffer(result, 'binary');
    const conv = new iconv.Iconv('utf8', 'windows-1251');
    res.write(conv.convert(body));
    res.end();
}));

export default router;
