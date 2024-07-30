import { naturalSort } from "../sort";
import { IFileNode } from "./types";

type FileSort = (a: IFileNode, b: IFileNode) => number;

function defaultFileSort(a: IFileNode, b: IFileNode) {
  return a.kind() === b.kind()
    ? a.name < b.name
      ? -1
      : 1
    : a.kind() === "directory"
    ? -1
    : 1;
}

export function fileSort(root: IFileNode, sort: FileSort = defaultFileSort) {
  if (!root.children) return root;
  root.children.sort(sort);
  root.children.forEach((f) => fileSort(f));
  return root;
}

export function fileChildrenSort(children: IFileNode[]) {
  const { directory, file } = Object.groupBy(children, (r) => r.kind());
  return [
    ...(directory ? naturalSort(directory, (a) => a.name) : []),
    ...(file ? naturalSort(file, (a) => a.name) : []),
  ];
}

export function fileNaturalSort(
  root: IFileNode,
  depth: number | undefined = undefined
) {
  if (root.kind() === "file" || (depth !== undefined && depth === 0))
    return root;
  root.children = fileChildrenSort(root.children);
  const ndepth = depth === undefined ? undefined : depth - 1;
  root.children.forEach((f) => fileNaturalSort(f, ndepth));
  return root;
}
