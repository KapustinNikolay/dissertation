/**
 * Created by nik on 25.03.17.
 */
import co from 'co';
import _ from 'lodash';
import Employee from '../../models/Employees';
import Company from '../../models/Companies';
import _structureAnalysis from './structureAnalysis';
import _smoAnalysis from './smoAnalysis';
import indAnalysis from './individualAnalysis';
import {
    objToCsvString,
    makeCsvTitle,
    stringSeparator
} from './csv';

export const calculate = co.wrap(function*(user) {
    let employees = yield Employee.find({user}).lean();
    let companies = yield Company.find({user}).lean();

    const structureAnalysis = _structureAnalysis(employees, companies);
    const smoAnalysis = _smoAnalysis(employees, companies);
    let structureAnalysisRec = _.minBy(structureAnalysis, i => Math.abs(i.a - i.b));
    structureAnalysisRec = structureAnalysisRec && structureAnalysisRec.name;
    let smoAnalysisRes = _.minBy(smoAnalysis, (i) => (i.Wsis));
    smoAnalysisRes = smoAnalysisRes && smoAnalysisRes.name;
    return {
        structureAnalysis,
        smoAnalysis,
        structureAnalysisRec,
        smoAnalysisRes
    }
});

export const individualAnalysis = co.wrap(function*(companyId) {
    let employees = yield Employee.find({
        type: "employee",
        company: companyId
    }).lean();

    let company = yield Company.findOne({_id: companyId}).lean();

    return {
        company,
        calculations: indAnalysis(employees)
    };
});

export const exportCvs = co.wrap(function*(user) {
    const data = yield calculate(user);
    let cvs = 'Метод информационных оценок' + stringSeparator;

    const structureAnalysisTitles = [
        'Вариант организационной структуры',
        'Системная сложность Со',
        'Собственная сложность Сс',
        'Внутренняя сложность Св',
        'Коэффициент централизации',
        'Коэффициент децентрализации'
    ];

    cvs += makeCsvTitle(structureAnalysisTitles);
    data.structureAnalysis.forEach(i => {
        cvs += objToCsvString(i);
    });
    cvs += objToCsvString(['Лучший вариант:', data.structureAnalysisRec]);
    cvs += stringSeparator;
    cvs += 'Метод, основанный на теории массового обслуживания' + stringSeparator;

    const smoAnalysisTitles = [
        'Вариант организационной структуры',
        'Загруженность операциями',
        'Среднее количество выполняемых операций, Ед.',
        'Среднее время выполнения операции, Мин.',
        'Среднее количество операций, ожидающих выполнения, Ед.',
        'Среднее время ожидания выполнения операций, Мин.'
    ];
    cvs += makeCsvTitle(smoAnalysisTitles);
    data.smoAnalysis.forEach(i => {
        cvs += objToCsvString(i);
    });
    cvs += objToCsvString(['Лучший вариант:', data.smoAnalysisRes]);

    return cvs;
});
