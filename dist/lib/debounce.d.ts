export declare function debounce<T extends unknown[]>(func: (...a: T) => void, delay: number): <U extends T>(...args: U) => void;
export declare function debounce_r<T extends unknown[], R>(func: (...a: T) => R, delay: number): <U extends T>(...args: U) => Promise<unknown>;
