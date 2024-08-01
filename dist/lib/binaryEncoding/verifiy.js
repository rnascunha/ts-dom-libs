import { dataType } from "./constants";
import { encoding } from "./types";
function is_encoding(encode) {
    return encoding.includes(encode);
}
export function check_encoding(encode) {
    if (!is_encoding(encode))
        throw new Error("Invalid Encoding");
}
/**
 * Check valid characters
 */
export function is_binary(char) {
    const c = char.charAt(0);
    return c === "0" || c === "1";
}
export function is_octal(char) {
    const c = char.charAt(0);
    return c >= "0" && c <= "7";
}
export function is_hexa(char) {
    const c = char.charAt(0);
    return ((c >= "0" && c <= "9") || (c >= "a" && c <= "f") || (c >= "A" && c <= "F"));
}
export function is_decimal(char) {
    const c = char.charAt(0);
    return c >= "0" && c <= "9";
}
export function is_ascii(char) {
    return char.charCodeAt(0) <= 255;
}
export function is_base64(char) {
    const c = char.charAt(0);
    return ((c >= "0" && c <= "9") || (c >= "a" && c <= "z") || (c >= "A" && c <= "Z"));
}
export function is_ascii_printable(char) {
    return is_ascii_code_printable(char.charCodeAt(0));
}
export function is_ascii_code_printable(code) {
    return code >= 32 && code <= 126;
}
export function is_encode_char(char, enc) {
    check_encoding(enc);
    return dataType[enc].check_char(char);
}
export function is_valid(str, encode) {
    return Array.from(str).every((c) => is_encode_char(c, encode));
}
