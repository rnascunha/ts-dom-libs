export interface UploadFileArgs<T = string> {
    data: T;
    files: FileList | File;
}
export declare function uploadFileList(files: FileList | File): Promise<UploadFileArgs<string>>;
export declare function uploadFileListArrayBuffer(files: FileList | File): Promise<UploadFileArgs<ArrayBuffer>>;
