// https://rosettacode.org/wiki/Natural_sorting
// https://blog.codinghorror.com/sorting-for-humans-natural-sort-order/
// https://blog.miigon.net/posts/how-to-sort-file-names-naturally/
// natural sort algorithm in JavaScript by Miigon.
// 2021-03-30
//
// GitHub: https://github.com/miigon/

function split<T>(v: T, access: (a: T) => string) {
  let processedName: (number | string)[] = [];
  let str = access(v);
  for (let i = 0; i < str.length; i++) {
    let isNum = false;
    if (str[i] !== " ") isNum = Number.isInteger(Number(str[i]));

    // let isNum = Number.isInteger(Number(str[i]));
    let j;
    for (j = i + 1; j < str.length; j++) {
      if (Number.isInteger(Number(str[j])) != isNum) break;
    }
    processedName.push(isNum ? Number(str.slice(i, j)) : str.slice(i, j));
    i = j - 1;
  }
  return <[(string | number)[], T]>[processedName, v];
}

function compare<T>(a: [(string | number)[], T], b: [(string | number)[], T]) {
  let len = Math.min(a[0].length, b[0].length);
  for (let i = 0; i < len; i++) {
    if (a[0][i] != b[0][i]) {
      let isNumA = Number.isInteger(a[0][i]);
      let isNumB = Number.isInteger(b[0][i]);
      if (isNumA && isNumB) return (a[0][i] as number) - (b[0][i] as number);
      else if (isNumA) return -1;
      else if (isNumB) return 1;
      else return a[0][i] < b[0][i] ? -1 : 1;
    }
  }
  // in case of one string being a prefix of the other
  return a[0].length - b[0].length;
}

export function naturalSort<T>(arr: Array<T>, access: (a: T) => string) {
  return arr
    .map((v) => split(v, access))
    .sort((a, b) => compare(a, b))
    .map((v) => v[1]);
}

/**
 * This is to be used with default sort algorithm from javascript:
 * \code
 *  arr.sort((a, b) => naturalSort2(a, b, v => v.access))
 * \endcode
 * 
 * As split must be call each time to each comparison, the performance
 * must be much worse. But not benchmarked...
 */
export function naturalSort2<T>(a: T, b: T, access: (a: T) => string) {
  return compare(split(a, access), split(b, access));
}

