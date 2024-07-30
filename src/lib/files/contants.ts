import { ResizeImageOptions } from "../image";
import { CreateTreeOptions, GetChildrenOptions, IFileNode } from "./types";

export const defaultGetChildrenOptions: GetChildrenOptions = {
  force: false,
  filter: () => true,
  sort: (n: IFileNode[]) => n,
};

export const defaultCreateTreeOptions: CreateTreeOptions = {
  ...defaultGetChildrenOptions,
  maxDepth: undefined,
};

export const defaultThumbnailOptions: ResizeImageOptions = {
  scale: 0.1,
}