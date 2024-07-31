/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64
 */
export declare function base64_decode(sBase64: string, nBlocksSize?: number): Uint8Array;
interface Base64EncodeOptions {
    breakline?: boolean;
    pad?: boolean;
}
export declare function base64_encode(aBytes: Uint8Array, options?: Base64EncodeOptions): string;
export declare function base64_encode_string(aBytes: string): string;
export declare function base64_encode2(aBytes: string | Uint8Array): string;
export {};
