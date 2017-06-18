/**
 * Created by nik on 25.03.17.
 */
import _ from 'lodash';
import {toN3, factorial, isNotEmptyArray} from './utils';

const WORK_DAYS = 247;
const WORK_HOURS = 8;

export default function (_employees, _companies) {
    const result = [];

    const employees = _.groupBy(_employees, 'company');
    const companies = _.keyBy(_companies, '_id');

    for (let i in employees) {
        if (!employees.hasOwnProperty(i) || !companies.hasOwnProperty(i)) {
            break;
        }

        let _employees = employees[i];

        let workers = _.filter(_employees, {type: 'employee'});
        let departments = _.filter(_employees, {type: 'department'});


        workers.forEach(calculateEmplyees);
        calculateDepartments(departments, workers);

        const conc = workers.concat(departments);

        const res = {
            name: companies[i].name,
            P: 0,
            Lsis: 0,
            Wsis: 0,
            Loch: 0,
            Woch: 0
        };

        conc.forEach((doc) => {
            res.Wsis += doc.Wsis || 0;
            res.P += doc.P || 0;
            res.Lsis += doc.Lsis || 0;
            res.Loch += doc.Loch || 0;
            res.Woch += doc.Woch || 0;
        });

        let i;
        for (i in res) {
            if (res.hasOwnProperty(i) && typeof res[i] === 'number') {
                res[i] = _.round(res[i], 2);
            }
        }

        res.P = (res.P * 100) + '%';
        result.push(res);
    }


    return result;
}

function calculateDepartments(departments, workers) {
    departments.forEach((department) => {
        const _workers = _.filter(workers, {parent: department._id});
        let My = 0;
        let Lb = 0;
        let N = 0;
        let Po = 1;

        _workers.forEach((worker, i) => {
            if (worker.My && worker.Lb) {
                const P = worker.Lb / worker.My;
                My += worker.My;
                Lb += worker.Lb;
                ++N;
                ++i;
                Po += Math.pow(P, i) / factorial(i);
            }
        });

        Po = Math.pow(Po, -1);
        const P = Lb / My;

        const Loch = (Math.pow(P, N + 1) * Po) / (N * factorial(N) * Math.pow(1 - (P / N), 2));
        const Lsis = Loch + P;
        const Wsis = (1 / Lb) * Lsis;
        const Woch = (1 / Lb) * Loch;

        department.Lb = Lb;
        department.My = My;
        department.P = P;
        department.Lsis = Lsis;
        department.Wsis = Wsis;
        department.Loch = Loch;
        department.Woch = Woch;
    });
}

export function calculateEmplyees(worker) {
    //if (worker._id.toString() != '593e4b0e9c40d7026efde22b') return false;
    const res = {};
    const {processes} = worker;
    const {t, lb} = detourProcesses(processes);

    res.Lb = lb / (WORK_DAYS * WORK_HOURS);
    res.My = lb / t * 3600;
    res.p = res.Lb / res.My;
    res.Lsis = res.p / (1 - res.p);
    res.Wsis = res.p / (res.Lb * (1 - res.p));
    res.Loch = Math.pow(res.p, 2) / (1 - res.p);
    res.Woch = Math.pow(res.p, 2) / (res.Lb * (1 - res.p));

    let i;
    for (i in res) {
        if (res.hasOwnProperty(i)) {
            res[i] = res[i] ? _.round(res[i], 2) : 0;
        }
    }

    _.merge(worker, res);
    res.name = worker.name;

    //console.log('RESULT', worker);
    return res;

    function detourProcesses(processes) {
        const res = {
            t: 0,
            lb: 0
        }
        if (!isNotEmptyArray(processes)) return res;

        processes.forEach(process => {
            const {functions} = process;
            const {t, lb} = detourFunctions(functions);
            process.t = (t || 0) * process.v;
            process.lb = (process.v || 1) * (lb || 1);
            res.t += process.t
            res.lb += process.lb;

            //console.log('PROCESS', process.name, process.t, process.lb);
        });
        return res;
    }

    function detourFunctions(functions) {
        const res = {
            t: 0,
            lb: 0
        };

        if (!isNotEmptyArray(functions)) return res;

        functions.forEach(fn => {
            const {actions} = fn;
            const {t, lb} = detourActions(actions);
            fn.t = (t || 0) * fn.v;
            fn.lb = (fn.v || 1) * (lb || 1);
            res.t += fn.t;
            res.lb += fn.lb;

            //console.log('FUNCTION', fn.name, fn.t, fn.lb);
        });

        return res;
    }

    function detourActions(actions) {
        const res = {
            t: 0,
            lb: 0
        }
        if (!isNotEmptyArray(actions)) return res;

        actions.forEach(action => {
           if (action.type == 'subFunction') {
               const {operations} = action;
               const {t, lb} = detourOperations(operations);

               action.t = (t || 0) * action.v;
               action.lb = (action.v || 1) * (lb || 1);
               res.t += action.t;
               res.lb += action.lb

               //console.log('ACTION SUBFUNCTION', action.name, action.t, action.lb);
           } else {
               const {subOperations} = action;
               const {t, lb} = detourSubOperations(subOperations);
               action.t = (t || 0) + (action.t || 1) * (action.v || 1);
               action.lb = (action.v || 1) * (lb || 1);
               res.t += action.t;
               res.lb += action.lb

               //console.log('ACTION OPERATION', action.name, action.t, action.lb);
           }
        });

        return res;
    }

    function detourOperations(operations) {
        const res = {
            t: 0,
            lb: 0
        }

        if (!isNotEmptyArray(operations)) return res;

        operations.forEach(operation => {
            const {subOperations} = operation;
            const {t, lb} = detourSubOperations(subOperations);
            operation.t = (t || 0) + (operation.t || 1) * (operation.v || 1);
            operation.lb = (operation.v || 1) * (lb || 1);
            res.t += operation.t;
            res.lb += operation.lb;

            //console.log('OPERATION', operation.name, operation.t, operation.lb);
        });

        return res;
    }

    function detourSubOperations(subOperations) {
        let res = {
            t: 0,
            lb: 0
        };
        if (!isNotEmptyArray(subOperations)) return res;

        subOperations.forEach(subOperation => {
            const {items, rate} = subOperation;
            const {t, lb} = detourItems(items, rate);
            subOperation.t = t;
            subOperation.lb = lb;
            res.t += t;
            res.lb += lb;

            //console.log('SUBOPERATION', subOperation.name, subOperation.t, subOperation.lb);
        });

        return res;
    }

    function detourItems(items, rate) {
        let res = {
            t: 0,
            lb: 0
        };
        if (!isNotEmptyArray(items)) return res;

        items.forEach(item => {
            item.t = rate * item.v * item.t;
            item.lb = rate * item.v;
            res.t += item.t;
            res.lb += item.lb;

            //console.log('ITEM', item.name, item.t, item.lb);
        });

        return res;
    }
}
