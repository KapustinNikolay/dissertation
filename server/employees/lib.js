/**
 * Created by nik on 14.01.17.
 */
import co from 'co';
import _ from 'lodash';
import {Types} from 'mongoose';
import makeOrgTree from '../common/makeOrgTree';
import Employees from  '../../models/Employees';

export function employeeCreate(employee) {
    return new Employees(employee).save();
}

export const employeeGet = co.wrap(function*(id) {
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

    if (data.type == "department") {
        delete data.processes;
        update.$unset = {processes: '1'};
    }
    return Employees.update(
        {_id},
        data
    );
}

export const removeEmployee = co.wrap(function* (_id) {
    const child = yield Employees.findOne({parent: _id});

    if (child) {
        throw 'Орг звено имеет подчиненных';
    }

    return Employees.remove({_id});
})

export const cloneEmployee = co.wrap(function*(target, copyEmployee) {
    const targetParent = yield Employees.findById(target).lean();

    if (!targetParent) {
        throw new Error('not found');
    }

    const {company, user} = targetParent;

    const child = yield Employees.findById(copyEmployee).lean();

    if (!child) {
        throw new Error('not found');
    }

    child._oldId = child._id;
    child._id = new Types.ObjectId();
    child.company = company;
    child.user = user;
    child.parent = targetParent._id;
    const allChildren = yield getAllChildren(company, user, [child._oldId], []);
    allChildren.push(child);

    const _allChildren = _.keyBy(allChildren, '_oldId');

    allChildren.forEach((_child) => {
        if (_child != child && _child.parent) {
            const parent = _allChildren[_child.parent.toString()];
            if (parent) {
                _child.parent = parent._id;
            }
        }
    });

    return Employees.insertMany(allChildren);
});

const getAllChildren = co.wrap(function* (company, user, parents, result) {
    const children = yield Employees.find({
        parent: {
            $in: parents
        }
    }).lean();

    if (children.length) {
        const parents = [];
        children.forEach((child) => {
            parents.push(child._id);
            child._oldId = child._id;
            child._id = new Types.ObjectId();
            child.company = company;
            child.user = user;
            result.push(child);
        });
        return getAllChildren(company, user, parents, result);
    } else {
        return result;
    }
});
