/**
 * String blob is a blob but "wrongly" received as a string.
 */
export declare function stringBlobToBlob(stringBlob: string, type?: string): Blob;
export declare function blobToURL(blob: Blob): Promise<string>;
