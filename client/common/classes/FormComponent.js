/**
 * Created by nik on 07.06.17.
 */
export class ComponentWithArrays {
    addToArray(array, item) {
        array.push(item);
    }

    removeFromArray(array, i) {
        array.splice(i, 1);
    }
}