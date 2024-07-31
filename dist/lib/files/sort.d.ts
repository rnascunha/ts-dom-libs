import { IFileNode } from "./types";
type FileSort = (a: IFileNode, b: IFileNode) => number;
export declare function fileSort(root: IFileNode, sort?: FileSort): IFileNode;
export declare function fileChildrenSort(children: IFileNode[]): IFileNode[];
export declare function fileNaturalSort(root: IFileNode, depth?: number | undefined): IFileNode;
export {};
