/**
 * Created by nik on 14.01.17.
 */
import * as lib from './lib';
import wrap from 'co-express';

export const companySave = wrap(function* (req, res) {
  const company = yield lib.saveCompany(req.body);
  res.json(company);
});

export const getCompaniesList = wrap(function* (req, res) {
  const companies = yield lib.getCompaniesList();
  res.json(companies);
});

export const getCompany = wrap(function* (req, res) {
  const company = yield lib.getCompany(req.params.id);
  res.json(company);
});

export const companyUpdate = wrap(function* (req, res) {
  const u = yield lib.updateCompany(req.params.id, req.body);
  res.json({});
});