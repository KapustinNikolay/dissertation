/**
 * Created by nik on 14.01.17.
 */
import * as lib from './lib';
import wrap from 'co-express';

export const employeeCreate = wrap(function* (req, res) {
  const result = yield lib.employeeCreate(req.body);
  res.json(result);
});

export const employeeGet = wrap(function* (req, res) {
  const result = yield lib.employeeGet(req.params.id);
  res.json(result);
});

export const employeeUpdate = wrap(function* (req, res) {
  const r = yield lib.employeeUpdate(req.params.id, req.body);
  res.json({});
});