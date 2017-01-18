/**
 * Created by nik on 14.01.17.
 */
import wrap from 'co-express';
import Companies from '../../models/Companies';
import Employees from '../../models/Employees';

export const checkCompanyInUser = wrap(function* (req, res, next) {
  const company = yield Companies.findOne(
    {
      user: req.user._id,
      _id: req.params.id
    }
  )
    .lean();

  next(!company && 'Wrong company');
});

export const checkEmployeeInUser = wrap(function* (req, res, next) {
  const employee = yield Employees.findOne(
    {
      user: req.user._id,
      _id: req.params.id
    }
    )
    .lean();

  next(!employee && 'Wrong company');
}); 