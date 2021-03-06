/**
 * Created by nik on 14.01.17.
 */
import * as lib from './lib';
import wrap from 'co-express';

export const employeeCreate = wrap(function*(req, res) {
    let employee = req.body;
    employee.user = req.user._id;
    const result = yield lib.employeeCreate(employee);
    res.json(result);
});

export const employeeGet = wrap(function*(req, res) {
    const result = yield lib.employeeGet(req.params.id);
    res.json(result);
});

export const employeeUpdate = wrap(function*(req, res) {
    const r = yield lib.employeeUpdate(req.params.id, req.body);
    res.json({});
});

export const employeeRemove = wrap(function* (req, res) {
    const {id} = req.params;

    yield lib.removeEmployee(id);
    res.json({});
})

export const employeeClone = wrap(function*(req, res) {
    const {id} = req.params;
    const {copyEmployee} = req.body;
    yield lib.cloneEmployee(id, copyEmployee);
    res.json({});
});
