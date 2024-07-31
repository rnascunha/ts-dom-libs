import { uploadFileList } from "@/lib/upload_file";
import {
  defaultGetChildrenOptions,
  defaultThumbnailOptions,
} from "../constants";
import { GetChildrenOptions, IFileNode } from "../types";
import { resizeImageDataURL } from "@/lib/image";

export class FileNode implements IFileNode {
  private _handle: FileSystemDirectoryHandle | File;
  private _path: string[];
  private _children?: IFileNode[];
  private _data?: string = undefined;
  private _thumbnail?: string = undefined;

  constructor(
    handle: FileSystemDirectoryHandle | File,
    path_parent: string[],
    children?: IFileNode[]
  ) {
    this._handle = handle;
    this._path = [...path_parent, handle.name];
    this._children = children;
  }

  get handle() {
    return this._handle;
  }

  get type() {
    return this.kind() === "file" ? (this._handle as File).type : "directory";
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

  get children() {
    if (this.kind() === "file") throw new Error("Not a directory");
    return this._children as IFileNode[];
  }

  set children(childs: IFileNode[]) {
    if (this.kind() === "file") throw new Error("Not a directory");
    this._children = childs;
  }

  async getChildren(
    options: Partial<GetChildrenOptions> = {}
  ): Promise<IFileNode[]> {
    if (this.kind() === "file") throw new Error("Not a directory");

    const opt = { ...defaultGetChildrenOptions, ...options };
    if (!opt.force && this._children !== undefined) return this._children;

    this._children = [];
    for await (const entry of (
      this._handle as FileSystemDirectoryHandle
    ).values()) {
      const newEntry =
        entry instanceof FileSystemFileHandle ? await entry.getFile() : entry;
      const newChild = new FileNode(newEntry, this.path);
      if (opt.filter(newChild))
        this._children.push(new FileNode(newEntry, this.path));
    }
    this._children = opt.sort(this._children);

    return this._children;
  }

  kind() {
    return this._handle instanceof File ? "file" : "directory";
  }

  async data() {
    if (this._data) return this._data;
    if (this.kind() === "directory") return undefined;
    this._data = (await uploadFileList(this._handle as File)).data;
    return this._data;
  }

  clear() {
    if (this._data) URL.revokeObjectURL(this._data);
  }

  async thumbnail(): Promise<string> {
    if (this._thumbnail) return this._thumbnail;
    const data = await this.data();
    this._thumbnail = await resizeImageDataURL(
      data as string,
      defaultThumbnailOptions
    );
    return this._thumbnail;
  }
}
