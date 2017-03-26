/**
 * Created by nik on 25.03.17.
 */
import _ from 'lodash';
import {toN3, factorial} from './utils';

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
      Lb : 0,
      My : 0,
      P : 0,
      Lsis : 0,
      Wsis : 0,
      Loch : 0,
      Woch : 0
    };

    conc.forEach((doc) => {
      res.Lb += doc.Lb || 0;
      res.My += doc.My || 0;
      res.P += doc.P || 0;
      res.Lsis += doc.Lsis || 0;
      res.Wsis += doc.Wsis || 0;
      res.Loch += doc.Loch || 0;
      res.Woch += doc.Woch || 0;
    });

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

function calculateEmplyees(worker) {
  let My = 0; //Мю
  let Lb = 0; //Лямбда

  const {processes} = worker;
  if (processes && processes.length) {
    processes.forEach((process) => {
      let functionsMy = 0;
      let functionsLb = 0;

      const {functions} = process;
      if (functions && functions.length) {
        functions.forEach((func) => {
          let actionsMy = 0;
          let actionsLb = 0;

          const {actions} = func;
          if (actions && actions.length) {
            actions.forEach((action) => {

              let {operations} = action;
              if (action.type == 'subFunction' && operations && operations.length) {
                let operationsMy = 0;
                let operationsLb = 0;

                operations.forEach((operation) => {
                  operationsMy += (operation.t ? (1 / (operation.t / 512640)) : 0); //toDo: перевод в года???7
                  operationsLb += (operation.v || 0);
                });

                actionsMy += operationsMy;
                actionsLb += ((operationsLb || 1) * (action.v || 1)); 
              } else {
                actionsMy += (action.t ? (1 / (action.t / 512640)) : 0);//toDo: перевод в года???7
                actionsLb += (action.v || 0);
              }
            });
          }

          functionsMy += actionsMy;
          functionsLb += ((actionsLb || 1) * (func.v || 1));
        });
      }

      My += functionsMy;
      Lb += ((functionsLb || 1) * (process.v || 1));
    });
  }
  


  worker.Lb = Lb;
  worker.My = My;
  const P = worker.P = Lb / My;
  worker.Lsis = P / (1 - P);
  worker.Wsis = P / (Lb * (1 - P));
  worker.Loch = Math.pow(P, 2) / (1 - P);
  worker.Woch = Math.pow(P, 2) / (Lb * (1 - P));
}

