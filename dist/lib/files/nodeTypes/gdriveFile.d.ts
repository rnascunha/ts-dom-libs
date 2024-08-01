import { GetChildrenOptions, IFileNode } from "../types";
export interface HTTPError {
    code: number;
    message: string;
}
export interface GAPIError {
    error: HTTPError;
}
export declare class GDriveFile implements IFileNode {
    private _handle;
    private _path;
    private _children?;
    private _data?;
    private _thumbnail?;
    constructor(handle: gapi.client.drive.File, path_parent: string[], children?: IFileNode[]);
    get handle(): gapi.client.drive.File;
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
export declare function responseToDataURL(response: gapi.client.Response<gapi.client.drive.File>): Promise<string>;
