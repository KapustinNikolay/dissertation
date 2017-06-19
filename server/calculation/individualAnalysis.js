/**
 * Created by nik on 18.06.17.
 */
import {calculateEmplyees} from './smoAnalysis';

export default function (employees) {
    return employees.map((employee) => {
        const res = calculateEmplyees(employee);
        res._p = res.p;
        res.p = ((res.p * 100) || 0) + '%';
        return res;
    });
}