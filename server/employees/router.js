/**
 * Created by nik on 14.01.17.
 */
import express from 'express';
import * as controllers from './controllers';
import {checkEmployeeInUser, checkCompanyInUser} from '../common/middlewares';
const router = express.Router();

router.get('/:id', checkEmployeeInUser, controllers.employeeGet);
router.post('/', controllers.employeeCreate);
router.post('/:id', checkEmployeeInUser, controllers.employeeUpdate);
router.delete('/:id', checkEmployeeInUser, controllers.employeeRemove);
router.post('/:id/clone', checkEmployeeInUser, controllers.employeeClone);

export default router;