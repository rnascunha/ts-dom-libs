import { check_encoding } from "./verifiy";
import { dataType } from "./constants";
export function split_binary(str) {
    var _a;
    return (_a = str.match(/[01]{1,8}/g)) !== null && _a !== void 0 ? _a : [];
}
export function split_octal(str) {
    var _a;
    return (_a = str.match(/[0-3]?[0-7]{1,2}/g)) !== null && _a !== void 0 ? _a : [];
}
export function split_decimal(str) {
    var _a;
    return (_a = str.match(/25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2}/g)) !== null && _a !== void 0 ? _a : [];
}
export function split_hexa(str) {
    var _a;
    return (_a = str.match(/[0-9a-fA-F]{1,2}/g)) !== null && _a !== void 0 ? _a : [];
}
export function split_text(str) {
    var _a;
    return (_a = str.match(/\\x[0-9a-fA-F]{1,2}|\\n|\\r|\\0|\\\\|[ -~]/g)) !== null && _a !== void 0 ? _a : [];
}
export function split_base64(str) {
    return [str];
}
export function split(str, encode) {
    check_encoding(encode);
    return dataType[encode].split(str);
}
export function clear_string(str, enc) {
    check_encoding(enc);
    return Array.from(str)
        .filter((c) => dataType[enc].check_char(c))
        .join("");
}
export function byteSize(enc) {
    check_encoding(enc);
    return dataType[enc].char_byte_size;
}
