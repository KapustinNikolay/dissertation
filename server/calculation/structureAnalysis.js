/**
 * Created by nik on 25.03.17.
 */
import _ from 'lodash';
import {toN3} from './utils';

export default function (_employees, _companies) {
  const result = [];

  const employees = _.groupBy(_employees, 'company');
  const companies = _.keyBy(_companies, '_id');

  for (let i in employees) {
    if (!employees.hasOwnProperty(i) || !companies.hasOwnProperty(i)) {
      break;
    }
    let _employees = employees[i];

    let N = _employees.length; //number of leaves
    let Co = 0;
    _employees.forEach((employee) => {
      N += getNumberOfActions(employee.processes);
      Co += getCo(employee, _employees);
    });
    let Cc = toN3(Math.log2(N));
    Co = toN3(Co);
    const Cb = toN3(Cc - Co);
    const a = toN3(Cb / -Co);
    const b = toN3(1 - a);

    result.push(
      {
        name: companies[i].name,
        Cc, Co, Cb, a, b
      }
    );
  }

  return result;
}

function getNumberOfActions(processes) {
  if (!processes || !processes.length) {
    return 0;
  }

  let n = processes.length;
  processes.forEach((process) => {
    if (process.functions && process.functions.length) {
      n += process.functions.length;
      process.functions.forEach((func) => {
        if (func.actions && func.actions.length) {
          n += func.actions.length;
          func.actions.forEach((action) => {
            if (action.operations && action.operations.length) {
              n += action.operations.length;
            }
          });
        }
      });
    }
  });

  return n;
}

function getCo(employee, array) {
  const childrenN = array.reduce((res, el) => {
    return (el && el.parent && el.parent.toString()) == employee._id.toString() ? res + 1 : res;
  }, 0);

  let Co = childrenN ? Math.log2(childrenN) : 0;

  const {processes} = employee;
  if (processes && processes.length) {
    Co += Math.log2(processes.length);

    processes.forEach((process) => {
      const {functions} = process;
      if (functions && functions.length) {
        Co += Math.log2(functions.length);

        functions.forEach((func) => {
          const {actions} = func;
          if (actions && actions.length) {

            Co += Math.log2(actions.length);
            actions.forEach((action) => {
              const {operations} = action;
              if (operations && operations.length) {
                Co += Math.log2(operations.length);
              }
            });
          }
        });
      }
    });
  }

  return Co;
}