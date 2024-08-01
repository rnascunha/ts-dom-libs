import { GetChildrenOptions, IFileNode } from "../types";
export declare class FileNode implements IFileNode {
    private _handle;
    private _path;
    private _children?;
    private _data?;
    private _thumbnail?;
    constructor(handle: FileSystemDirectoryHandle | File, path_parent: string[], children?: IFileNode[]);
    get handle(): File | FileSystemDirectoryHandle;
    get type(): string;
    get name(): string;
    get path(): string[];
    get path_string(): string;
    get children(): IFileNode[];
    set children(childs: IFileNode[]);
    getChildren(options?: Partial<GetChildrenOptions>): Promise<IFileNode[]>;
    kind(): "directory" | "file";
    data(): Promise<string | undefined>;
    clear(): void;
    thumbnail(): Promise<string>;
}
