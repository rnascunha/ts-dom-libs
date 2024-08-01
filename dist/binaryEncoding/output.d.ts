import { Encoding, FormatOptions } from "./types";
export declare function format(str: string[], encode: Encoding, opt?: FormatOptions): string;
export declare function to_array_string(data: Uint8Array, encode: Encoding, pad?: string): string[];
export declare function convert(input: string[], from: Encoding, to: Encoding): string[];
export type SpecialChars = Record<string, string>;
export declare function string_to_ascii_array(chunk: string, chars?: SpecialChars): string[];
export declare function string_to_ascii(chunk: string, chars?: SpecialChars): string;
export declare function binary_to_ascii_array(chunk: Uint8Array, chars?: SpecialChars): string[];
export declare function binary_to_ascii(chunk: Uint8Array, chars?: SpecialChars): string;
