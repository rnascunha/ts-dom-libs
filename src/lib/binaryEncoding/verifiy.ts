import { dataType } from "./constants";
import { Encoding, encoding } from "./types";

function is_encoding(encode: Encoding): encode is Encoding {
  return encoding.includes(encode);
}

export function check_encoding(encode: Encoding): void {
  if (!is_encoding(encode)) throw new Error("Invalid Encoding");
}

/**
 * Check valid characters
 */
export function is_binary(char: string): boolean {
  const c = char.charAt(0);
  return c === "0" || c === "1";
}

export function is_octal(char: string): boolean {
  const c = char.charAt(0);
  return c >= "0" && c <= "7";
}

export function is_hexa(char: string): boolean {
  const c = char.charAt(0);
  return (
    (c >= "0" && c <= "9") || (c >= "a" && c <= "f") || (c >= "A" && c <= "F")
  );
}

export function is_decimal(char: string): boolean {
  const c = char.charAt(0);
  return c >= "0" && c <= "9";
}

export function is_ascii(char: string): boolean {
  return char.charCodeAt(0) <= 255;
}

export function is_base64(char: string): boolean {
  const c = char.charAt(0);
  return (
    (c >= "0" && c <= "9") || (c >= "a" && c <= "z") || (c >= "A" && c <= "Z")
  );
}

export function is_ascii_printable(char: string): boolean {
  return is_ascii_code_printable(char.charCodeAt(0));
}

export function is_ascii_code_printable(code: number): boolean {
  return code >= 32 && code <= 126;
}

export function is_encode_char(char: string, enc: Encoding): boolean {
  check_encoding(enc);
  return dataType[enc].check_char(char);
}

export function is_valid(str: string, encode: Encoding): boolean {
  return Array.from(str).every((c) => is_encode_char(c, encode));
}