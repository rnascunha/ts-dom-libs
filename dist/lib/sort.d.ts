export declare function naturalSort<T>(arr: Array<T>, access: (a: T) => string): T[];
/**
 * This is to be used with default sort algorithm from javascript:
 * \code
 *  arr.sort((a, b) => naturalSort2(a, b, v => v.access))
 * \endcode
 *
 * As split must be call each time to each comparison, the performance
 * must be much worse. But not benchmarked...
 */
export declare function naturalSort2<T>(a: T, b: T, access: (a: T) => string): number;
