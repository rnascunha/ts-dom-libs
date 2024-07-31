export function debounce(func, delay) {
    let timeout_id;
    return (...args) => {
        clearTimeout(timeout_id);
        timeout_id = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
export function debounce_r(func, delay) {
    let timeout_id;
    return (...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timeout_id);
            timeout_id = setTimeout(() => {
                try {
                    resolve(func(...args));
                }
                catch (e) {
                    reject(e);
                }
            }, delay);
        });
    };
}
