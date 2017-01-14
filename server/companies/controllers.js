/**
 * Created by nik on 14.01.17.
 */
import * as lib from './lib';
import wrap from 'co-express';

export const companySave = wrap(function* (req, res) {
  let company = req.body;
  company.user = req.user._id;
  const result = yield lib.saveCompany(company);
  res.json(result);
});

export const getCompaniesList = wrap(function* (req, res) {
  const companies = yield lib.getCompaniesList(req.user._id);
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