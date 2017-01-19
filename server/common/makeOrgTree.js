/**
 * Created by nik on 18.01.17.
 */
const types = {
  employee: 'сотрудник',
  department: 'отдел'
};

function rec(employees, parent, arr) {
  if (!arr || !arr.length) return;

  parent.children = arr.map(i => {
    return {
      _id: i._id,
      name: i.name,
      parent: i.parent,
      title: types[i.type]
    }
  });

  parent.children.forEach(i => {
    rec(employees, i, employees[i._id]);
  });
}

export default rec;