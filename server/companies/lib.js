/**
 * Created by nik on 14.01.17.
 */
import Companies from  '../../models/Companies';
import Employees from  '../../models/Employees';

export function getCompaniesList() {
  return Companies
    .find({}, {name:1})
    .lean();
}

export function getCompany(id) {
  let company = Companies.findById(id).lean();
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