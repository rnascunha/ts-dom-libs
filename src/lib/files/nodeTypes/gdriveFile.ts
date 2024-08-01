import {
  defaultGetChildrenOptions,
  defaultThumbnailOptions,
} from "../constants";
import { GetChildrenOptions, IFileNode } from "../types";
import { resizeImageDataURL } from "../../image";
import { blobToURL, stringBlobToBlob } from "../../blob";

export interface HTTPError {
  code: number;
  message: string;
}

export interface GAPIError {
  error: HTTPError;
}

export class GDriveFile implements IFileNode {
  private _handle: gapi.client.drive.File;
  private _path: string[];
  private _children?: IFileNode[];
  private _data?: string = undefined;
  private _thumbnail?: string = undefined;

  constructor(
    handle: gapi.client.drive.File,
    path_parent: string[],
    children?: IFileNode[]
  ) {
    this._handle = handle;
    this._path = [...path_parent, handle.name as string];
    this._children = children;
  }

  get handle() {
    return this._handle;
  }

  get type() {
    return this._handle.mimeType as string;
  }

  get name() {
    return this._handle.name as string;
  }

  get path() {
    return this._path;
  }

  get path_string() {
    return this._path.join("/");
  }

  get children() {
    if (this.kind() !== "directory") throw new Error("Not a directory");
    return this._children as IFileNode[];
  }

  set children(childs: IFileNode[]) {
    if (this.kind() !== "directory") throw new Error("Not a directory");
    this._children = childs;
  }

  async getChildren(
    options: Partial<GetChildrenOptions> = {}
  ): Promise<IFileNode[]> {
    if (this.kind() === "file") throw new Error("Not a directory");

    const opt = { ...defaultGetChildrenOptions, ...options };
    if (!opt.force && this._children !== undefined) return this._children;

    const response = await gapi.client.drive.files.list({
      q: `('${this._handle.id}' in parents) and (mimeType = 'application/vnd.google-apps.folder' or mimeType contains 'image/') and trashed = false`,
      fields: "files(id, name, mimeType, shared)",
      spaces: "drive",
    });
    if (response.status !== 200)
      throw new Error(
        `Erro reading files [${(response.result as GAPIError).error.message}]`
      );

    this._children = [];
    for (const entry of response.result.files as gapi.client.drive.File[]) {
      const newChild = new GDriveFile(entry, this.path);
      if (opt.filter(newChild))
        this._children.push(new GDriveFile(entry, this.path));
    }
    this._children = opt.sort(this._children);
    return this._children;
  }

  kind() {
    return this._handle.mimeType === "application/vnd.google-apps.folder"
      ? "directory"
      : "file";
  }

  async data() {
    if (this._data) return this._data;
    if (this.kind() === "directory") return undefined;
    if (this._handle.shared)
      return `https://drive.google.com/uc?export=view&id=${this._handle.id}`;

    let response;
    try {
      response = await gapi.client.drive.files.get({
        fileId: this._handle.id as string,
        alt: "media",
      });
    } catch (e) {
      const error = (e as gapi.client.Response<gapi.client.drive.File>)
        .result as GAPIError;
      throw error.error;
    }

    try {
      this._data = await responseToDataURL(response);
      return this._data;
    } catch (e) {
      throw (e as Error).message;
    }
  }

  clear() {
    if (this._data) URL.revokeObjectURL(this._data);
  }

  async thumbnail(): Promise<string> {
    if (this._thumbnail) return this._thumbnail;
    if (this._handle.shared)
      return `https://drive.google.com/thumbnail?sz=w100&id=${this._handle.id}`;

    const data = await this.data();
    this._thumbnail = await resizeImageDataURL(
      data as string,
      defaultThumbnailOptions
    );
    return this._thumbnail;
  }
}

export function responseToDataURL(
  response: gapi.client.Response<gapi.client.drive.File>
) {
  const blob = stringBlobToBlob(
    response.body,
    response.headers?.["Content-Type"]
  );
  return blobToURL(blob);
}
