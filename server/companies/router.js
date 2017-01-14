/**
 * Created by nik on 14.01.17.
 */
import express from 'express';
import {checkCompanyInUser} from '../common/middlewares';
import * as controllers from './controllers';
const router = express.Router();

router.get('/', controllers.getCompaniesList);
router.get('/:id', checkCompanyInUser, controllers.getCompany);
router.post('/', controllers.companySave);
router.post('/:id', checkCompanyInUser, controllers.companyUpdate);

export default router;