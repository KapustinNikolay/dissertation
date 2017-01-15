/**
 * Created by nik on 14.01.17.
 */
import express from 'express';
import * as controllers from './controllers';
import {checkEmployeeInUser} from '../common/middlewares';
const router = express.Router();

router.get('/:id', checkEmployeeInUser, controllers.employeeGet);
router.post('/', controllers.employeeCreate);
router.post('/:id', checkEmployeeInUser, controllers.employeeUpdate);

export default router;