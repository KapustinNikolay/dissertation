/**
 * Created by nik on 16.04.17.
 */
export const columnSeparator = '\t'; //'\t'
export const stringSeparator = '\n'; //'\n'

export function makeCvsTitle(array) {
    let string = '';

    array.forEach(i => {
        string += i + columnSeparator;
    });

    return string + stringSeparator;
}

export function objToCvsString(obj) {
    let string = '';

    for(const i in obj) {
        if (obj.hasOwnProperty(i)) {
            const val = obj[i].toString().replace('\t', '').replace('\n', '').trim() || '-';
            string += val + columnSeparator;
        }
    }

    return string + stringSeparator;
}
