/**
 * Created by nik on 14.01.17.
 */
import co from 'co';
import _ from 'lodash';
import makeOrgTree from '../common/makeOrgTree';
import Employees from  '../../models/Employees';

export function employeeCreate(employee) {
  return Employees.create(employee);
}

export const employeeGet = co.wrap(function* (id) {
  let employee = yield Employees.findById(id).lean();

  let children = yield Employees.find(
    {
      company: employee.company
    })
    .lean();

  children = _.groupBy(children, 'parent');

  employee.title = 'сотрудник';

  makeOrgTree(children, employee, children[employee._id]);

  return employee;
});

export function employeeUpdate(_id, data) {
  let update = {$set: data};

  if (data.type == "department") {
    delete data.processes;
    update.$unset = {processes: '1'};
  }
  return Employees.update(
    {_id},
    update
  );
}