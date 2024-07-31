// https://medium.com/@fabio.valencio/m%C3%A1ximo-divisor-comum-mdc-em-javascript-1a74cc6b7073
export function gcd(nums) {
    let n = nums[0];
    for (const num of nums) {
        if (num == nums[0])
            continue;
        n = _gcd(n, num);
    }
    return n;
}
function _gcd(a, b) {
    while (b)
        [a, b] = [b, a % b];
    return a;
}
export function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
