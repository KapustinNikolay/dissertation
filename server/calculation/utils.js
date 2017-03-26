/**
 * Created by nik on 25.03.17.
 */
export function toN3(n) {
  return +n.toFixed(3);
}

export function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}