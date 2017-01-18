/**
 * Created by nik on 18.01.17.
 */
function rec(employees, parent, arr) {
  if (!arr || !arr.length) return;

  parent.children = arr.map(i => {
    return {
      _id: i._id,
      name: i.position,
      parent: i.parent,
      title: 'сотрудник'
    }
  });

  parent.children.forEach(i => {
    rec(employees, i, employees[i._id]);
  });
}

export default rec;