import { GetChildrenOptions, IFileNode } from "../types";
export declare class oldFileNode implements IFileNode {
    private _file;
    constructor(file: oldFileNodeFile | oldFileNodeDirectory);
    get name(): string;
    get type(): string;
    get path(): string[];
    get path_string(): string;
    get children(): IFileNode[];
    getChildren(options?: Partial<GetChildrenOptions>): Promise<IFileNode[]>;
    kind(): FileSystemHandleKind;
    data(): Promise<string>;
    clear(): void;
    thumbnail(): Promise<string>;
}
export declare class oldFileNodeFile implements IFileNode {
    private _handle;
    private _path;
    private _data;
    private _thumbnail;
    constructor(handle: File, basePath?: string[]);
    get handle(): File;
    get type(): string;
    get name(): string;
    get path(): string[];
    get path_string(): string;
    get children(): never;
    getChildren(options?: Partial<GetChildrenOptions>): Promise<IFileNode[]>;
    kind(): FileSystemHandleKind;
    data(): Promise<string>;
    clear(): void;
    thumbnail(): Promise<string>;
}
export declare class oldFileNodeDirectory implements IFileNode {
    private _path;
    private _children;
    constructor(path: string[], children?: IFileNode[]);
    get name(): string;
    get type(): string;
    get path(): string[];
    get path_string(): string;
    get children(): IFileNode[];
    set children(children: IFileNode[]);
    getChildren(options?: Partial<GetChildrenOptions>): Promise<IFileNode[]>;
    kind(): FileSystemHandleKind;
    data(): Promise<never>;
    clear(): void;
    thumbnail(): Promise<never>;
}
