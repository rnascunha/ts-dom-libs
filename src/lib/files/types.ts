export type FileFilter = (file: IFileNode) => boolean;
export type FileSort = (files: IFileNode[]) => IFileNode[];

export interface GetChildrenOptions {
  force: boolean;
  filter: FileFilter;
  sort: FileSort;
}

export interface IFileNode {
  name: string;
  type: string;
  path: string[];
  path_string: string;
  children: IFileNode[];
  getChildren(opt: Partial<GetChildrenOptions>): Promise<IFileNode[]>;
  kind(): FileSystemHandleKind;
  data(): Promise<string | undefined>;
  clear(): void;
  thumbnail(): Promise<string>;
}

export interface IFileNodeRef {
  file: IFileNode;
  children?: IFileNodeRef[];
}

export interface CreateTreeOptions extends GetChildrenOptions {
  maxDepth?: number;
  baseDir?: IFileNode;
}