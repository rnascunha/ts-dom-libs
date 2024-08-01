/**
 * Encoding
 */
export declare const encoding: readonly ["binary", "octal", "decimal", "hexa", "text", "base64"];
export type Encoding = (typeof encoding)[number];
export interface DataTypesInterface {
    base: number;
    char_byte_size: number;
    check_char: (char: string) => boolean;
    split: (str: string) => string[];
}
export interface FormatOptions {
    pad?: string;
    separator?: string;
}
