import { CreateTreeOptions, IFileNode } from "./types";
export declare function getDirectoryHandler(mode: FileSystemPermissionMode): Promise<FileSystemDirectoryHandle>;
export declare function supportsFileSystemAccess(): boolean;
export declare function oldFileSystemAccess(): Promise<FileList>;
export declare function filePicker(accept: string, multiple?: boolean): Promise<FileList>;
export declare function openDirectory(mode?: FileSystemPermissionMode, base?: IFileNode, options?: Partial<CreateTreeOptions>): Promise<IFileNode>;
