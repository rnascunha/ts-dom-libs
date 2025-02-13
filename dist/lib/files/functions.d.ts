import { IFileNode, IFileNodeRef } from "./types";
export declare function fileParent(root: IFileNode[], path: string[], maxDepth?: number, parent?: IFileNode | undefined): [IFileNode | undefined, IFileNode[], number] | undefined;
export declare function fileSimbling(root: IFileNode[], path: string[], maxDepth?: number): [IFileNode[], number] | undefined;
export declare function fileDescendent(root: IFileNode[], path: string[], maxDepth?: number): IFileNode | undefined;
export declare function fileNextSimbling(root: IFileNode[], path: string[], maxDepth?: number): IFileNode | undefined;
export declare function filePreviousSimbling(root: IFileNode[], path: string[], maxDepth?: number): IFileNode | undefined;
export declare function execAllNodes<T extends IFileNode>(root: T[], exec: (node: T) => boolean | void): void;
export declare function filterNodes(root: IFileNode[], filter: (file: IFileNode) => boolean): IFileNodeRef[];
export declare function findNode<T extends IFileNode>(root: T[], find: (node: T) => boolean): T | undefined;
export declare function findAllNodes(root: IFileNode[], find: (node: IFileNode) => boolean): IFileNode[];
export declare function findNodeAndParent(root: IFileNode[], find: (node: IFileNode) => boolean): [IFileNode, IFileNode] | undefined;
export declare function findAllNodeAndParent(root: IFileNode[], find: (node: IFileNode) => boolean): [IFileNode, IFileNode][];
export declare function findPattern(root: IFileNode[], pattern: string): IFileNode[];
export declare function clearTreeNodeData(root: IFileNode[]): void;
export declare function removeTreeNode(root: IFileNode[], find: (node: IFileNode) => boolean): IFileNode[] | undefined;
export declare function removeNode(root: IFileNode[], path: string[]): [IFileNode, IFileNode] | undefined;
export declare function isDescendent(parent: IFileNode, child: IFileNode): boolean;
