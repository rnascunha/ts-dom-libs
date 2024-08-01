import { CreateTreeOptions, IFileNode } from "./types";
export declare function createTreeNewAPI(dirHandle: FileSystemDirectoryHandle, baseDir?: IFileNode, options?: Partial<CreateTreeOptions>): Promise<IFileNode>;
export declare function createTreeOldAPI(files: FileList, baseDir?: IFileNode, options?: Partial<CreateTreeOptions>): IFileNode;
export declare function createTreeGDrive(files: gapi.client.drive.File, baseDir?: IFileNode, options?: Partial<CreateTreeOptions>): Promise<IFileNode>;
