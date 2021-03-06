/**
 * Created by nik on 14.01.17.
 */
import _ from 'lodash';
import co from 'co';
import makeOrgTree from '../common/makeOrgTree';
import Companies from  '../../models/Companies';
import Employees from  '../../models/Employees';

export function getCompaniesList(user) {
  return Companies
    .find({user}, {name:1})
    .lean();
}

export function getCompany(id) {
  let company = Companies.findById(id, {name: 1}).lean();
  let employees = Employees.find(
    {
      company: id,
      parent: {
        $exists: false
      }
    },
    {position: 1}
    )
    .lean();

  return Promise.all([company, employees])
    .then(result => {
      let company = result[0];
      company.employees = result[1];
      return company;
    });
}

export function saveCompany(company) {
  return Companies.create(company);
}

export function updateCompany(_id, company) {
  return Companies.update(
    {_id},
    {
      $set: company
    }
  );
}

export const getTree = co.wrap(function* (companyId) {
  let company = yield Companies.findById(companyId, {name: 1}).lean();
  let employees = yield Employees.find({company: companyId}).lean();
  employees = _.groupBy(employees, 'parent');

  company.title = 'Орг структура';

  makeOrgTree(employees, company, employees[undefined]);

  return company;
});