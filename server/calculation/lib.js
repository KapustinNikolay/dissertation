/**
 * Created by nik on 25.03.17.
 */
import co from 'co';
import Employee from '../../models/Employees';
import Company from '../../models/Companies';
import structureAnalysis from './structureAnalysis';
import smoAnalysis from './smoAnalysis';

export const calculate = co.wrap(function* (user) {
  let employees = yield Employee.find({user}).lean();
  let companies = yield Company.find({user}).lean();

  return {
    structureAnalysis: structureAnalysis(employees, companies),
    smoAnalysis: smoAnalysis(employees, companies)
  }
});
