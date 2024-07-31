import { base64_encode } from "./base64";
import { dataType } from "./constants";
import { to_data } from "./input";
import { check_encoding, is_ascii_code_printable, is_ascii_printable, } from "./verifiy";
export function format(str, encode, opt = {}) {
    check_encoding(encode);
    if (encode === "text")
        return str.join("");
    const fmt = Object.assign({ separator: " ", pad: "" }, opt);
    if (encode === "base64") {
        return fmt.pad.length === 0 ? str[0].replace(/=/g, "") : str[0];
    }
    if (fmt.pad.length > 0)
        str = str.map((v) => v.padStart(dataType[encode].char_byte_size, fmt.pad));
    return str.join(fmt.separator);
}
export function to_array_string(data, encode, pad = "") {
    check_encoding(encode);
    if (encode === "text")
        return binary_to_ascii_array(data);
    if (encode === "base64")
        return [base64_encode(data, { pad: pad.length > 0 })];
    const { base, char_byte_size } = dataType[encode];
    if (pad.length > 0)
        return Array.from(data).map((n) => n.toString(base).padStart(char_byte_size, pad));
    return Array.from(data).map((n) => n.toString(base));
}
export function convert(input, from, to) {
    if (from === to)
        return input;
    const d = to_data(input, from);
    return to_array_string(d, to);
}
const specialChars = {
    "\0": "\\0",
    "\n": "\\n",
    "\r": "\\r",
    "\\": "\\\\",
};
export function string_to_ascii_array(chunk, chars = specialChars) {
    const out = [];
    for (const c of chunk) {
        if (c in chars) {
            out.push(chars[c]);
            continue;
        }
        if (!is_ascii_printable(c)) {
            out.push("\\x" + c.charCodeAt(0).toString(16).padStart(2, "0"));
        }
        else
            out.push(c);
    }
    return out;
}
export function string_to_ascii(chunk, chars = specialChars) {
    return string_to_ascii_array(chunk, chars).join("");
}
export function binary_to_ascii_array(chunk, chars = specialChars) {
    const out = [];
    for (const code of chunk) {
        const c = String.fromCharCode(code);
        if (c in chars) {
            out.push(chars[c]);
            continue;
        }
        if (!is_ascii_code_printable(code)) {
            out.push("\\x" + code.toString(16).padStart(2, "0"));
        }
        else
            out.push(c);
    }
    return out;
}
export function binary_to_ascii(chunk, chars = specialChars) {
    return binary_to_ascii_array(chunk, chars).join("");
}
