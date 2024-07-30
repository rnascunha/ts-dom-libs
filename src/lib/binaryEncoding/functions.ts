import { check_encoding } from "./verifiy";
import { dataType } from "./constants";
import { Encoding } from "./types";

export function split_binary(str: string): string[] {
  return str.match(/[01]{1,8}/g) ?? [];
}

export function split_octal(str: string): string[] {
  return str.match(/[0-3]?[0-7]{1,2}/g) ?? [];
}

export function split_decimal(str: string): string[] {
  return str.match(/25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2}/g) ?? [];
}

export function split_hexa(str: string): string[] {
  return str.match(/[0-9a-fA-F]{1,2}/g) ?? [];
}

export function split_text(str: string): string[] {
  return str.match(/\\x[0-9a-fA-F]{1,2}|\\n|\\r|\\0|\\\\|[ -~]/g) ?? [];
}

export function split_base64(str: string): string[] {
  return [str];
}

export function split(str: string, encode: Encoding): string[] {
  check_encoding(encode);
  return dataType[encode].split(str);
}

export function clear_string(str: string, enc: Encoding): string {
  check_encoding(enc);
  return Array.from(str)
    .filter((c) => dataType[enc].check_char(c))
    .join("");
}

export function byteSize(enc:Encoding) {
  check_encoding(enc);
  return dataType[enc].char_byte_size;
}