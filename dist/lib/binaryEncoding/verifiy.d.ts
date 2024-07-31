import { Encoding } from "./types";
export declare function check_encoding(encode: Encoding): void;
/**
 * Check valid characters
 */
export declare function is_binary(char: string): boolean;
export declare function is_octal(char: string): boolean;
export declare function is_hexa(char: string): boolean;
export declare function is_decimal(char: string): boolean;
export declare function is_ascii(char: string): boolean;
export declare function is_base64(char: string): boolean;
export declare function is_ascii_printable(char: string): boolean;
export declare function is_ascii_code_printable(code: number): boolean;
export declare function is_encode_char(char: string, enc: Encoding): boolean;
export declare function is_valid(str: string, encode: Encoding): boolean;
