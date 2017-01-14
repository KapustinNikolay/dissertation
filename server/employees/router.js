/**
 * Created by nik on 14.01.17.
 */
import express from 'express';
import * as controllers from './controllers';
const router = express.Router();

router.get('/:id', controllers.employeeGet);
router.post('/', controllers.employeeCreate);
router.put('/:id', controllers.employeeUpdate);

export default router;