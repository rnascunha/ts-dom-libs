import { uploadFileList } from "@/lib/upload_file";
import {
  defaultGetChildrenOptions,
  defaultThumbnailOptions,
} from "../constants";
import { GetChildrenOptions, IFileNode } from "../types";
import { resizeImageDataURL } from "@/lib/image";

export class oldFileNode implements IFileNode {
  private _file: oldFileNodeFile | oldFileNodeDirectory;

  constructor(file: oldFileNodeFile | oldFileNodeDirectory) {
    this._file = file;
  }

  get name() {
    return this._file.name;
  }

  get type() {
    return this._file.type;
  }

  get path() {
    return this._file.path;
  }

  get path_string() {
    return this._file.path_string;
  }

  get children() {
    return this._file.children;
  }

  async getChildren(
    options: Partial<GetChildrenOptions> = {}
  ): Promise<IFileNode[]> {
    return this._file.getChildren(options);
  }

  kind() {
    return this._file.kind();
  }

  async data() {
    return await this._file.data();
  }

  clear() {
    return this._file.clear();
  }

  thumbnail(): Promise<string> {
    return this._file.thumbnail();
  }
}

export class oldFileNodeFile implements IFileNode {
  private _handle: File;
  private _path: string[];
  private _data: string | undefined = undefined;
  private _thumbnail: string | undefined = undefined;

  constructor(handle: File, basePath: string[] = []) {
    this._handle = handle;
    this._path = [
      ...basePath,
      ...(handle.webkitRelativePath === "" // When adding single files (not directories)
        ? [handle.name]
        : handle.webkitRelativePath.split("/")),
    ];
  }

  get handle() {
    return this._handle;
  }

  get type() {
    return this._handle.type;
  }

  get name() {
    return this._handle.name;
  }

  get path() {
    return this._path;
  }

  get path_string() {
    return this._path.join("/");
  }

  get children(): never {
    throw new Error("Not a directory");
  }

  getChildren(options: Partial<GetChildrenOptions> = {}): Promise<IFileNode[]> {
    throw new Error("Not a directory");
  }

  kind() {
    return "file" as FileSystemHandleKind;
  }

  async data() {
    if (this._data) return this._data;
    this._data = (await uploadFileList(this._handle)).data;
    return this._data;
  }

  clear() {
    if (this._data) URL.revokeObjectURL(this._data);
  }

  async thumbnail(): Promise<string> {
    if (this._thumbnail) return this._thumbnail;
    const data = await this.data();
    this._thumbnail = await resizeImageDataURL(data, defaultThumbnailOptions);
    return this._thumbnail;
  }
}

export class oldFileNodeDirectory implements IFileNode {
  private _path: string[];
  private _children: IFileNode[];

  constructor(path: string[], children: IFileNode[] = []) {
    this._path = path;
    this._children = children;
  }

  get name() {
    return this._path[this._path.length - 1];
  }

  get type() {
    return "directory";
  }

  get path() {
    return this._path;
  }

  get path_string() {
    return this._path.join("/");
  }

  get children() {
    return this._children;
  }

  set children(children: IFileNode[]) {
    this._children = children;
  }
  async getChildren(
    options: Partial<GetChildrenOptions> = {}
  ): Promise<IFileNode[]> {
    const opt = { ...defaultGetChildrenOptions, options };
    const c = this._children.filter(opt.filter);
    this._children = opt.sort(c);
    return this._children;
  }

  kind() {
    return "directory" as FileSystemHandleKind;
  }

  async data(): Promise<never> {
    throw new Error("Not a file");
  }

  clear() {}

  async thumbnail(): Promise<never> {
    throw new Error("Not a file");
  }
}
