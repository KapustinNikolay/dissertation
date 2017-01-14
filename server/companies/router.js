/**
 * Created by nik on 14.01.17.
 */
import express from 'express';
import * as controllers from './controllers';
const router = express.Router();

router.get('/', controllers.getCompaniesList);
router.get('/:id', controllers.getCompany);
router.post('/', controllers.companySave);
router.post('/:id', controllers.companyUpdate);

export default router;