import {
  split_base64,
  split_binary,
  split_decimal,
  split_hexa,
  split_octal,
  split_text,
} from "./functions";
import { DataTypesInterface, Encoding } from "./types";
import {
  is_ascii,
  is_base64,
  is_binary,
  is_decimal,
  is_hexa,
  is_octal,
} from "./verifiy";

/**
 * Type definitions
 */
export const dataType: Record<Encoding, DataTypesInterface> = {
  binary: {
    base: 2,
    char_byte_size: 8,
    check_char: is_binary,
    split: split_binary,
  },
  octal: {
    base: 8,
    char_byte_size: 3,
    check_char: is_octal,
    split: split_octal,
  },
  decimal: {
    base: 10,
    char_byte_size: 3,
    check_char: is_decimal,
    split: split_decimal,
  },
  hexa: {
    base: 16,
    char_byte_size: 2,
    check_char: is_hexa,
    split: split_hexa,
  },
  text: {
    base: 1,
    char_byte_size: 1,
    check_char: is_ascii,
    split: split_text,
  },
  base64: {
    base: 1,
    char_byte_size: 1,
    check_char: is_base64,
    split: split_base64,
  },
};
