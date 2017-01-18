/**
 * Created by nik on 14.01.17.
 */
import co from 'co';
import _ from 'lodash';
import Employees from  '../../models/Employees';

export function employeeCreate(employee) {
  return Employees.create(employee);
}

export function employeeGet(id) {
  let employee = Employees.findById(id).lean();
  let children = Employees.find(
    {
      parent: id
    },
    {position: 1}
  ).lean();

  return Promise.all([employee, children])
    .then(result => {
      let employee = result[0];
      employee.children = result[1];
      return employee;
    });
}

export function employeeUpdate(_id, data) {
  return Employees.update(
    {_id},
    {$set: data}
  );
}