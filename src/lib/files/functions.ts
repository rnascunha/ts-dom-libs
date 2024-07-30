import { IFileNode, IFileNodeRef } from "./types";

export function fileParent(
  root: IFileNode[],
  path: string[],
  maxDepth?: number,
  parent: IFileNode | undefined = undefined
) {
  if (path.length === 0 || (maxDepth !== undefined && maxDepth <= 0))
    return undefined;
  const c = root.findIndex((f) => f.name === path[0]);
  if (c === -1) return undefined;
  if (path.length === 1)
    return [parent, root, c] as [IFileNode | undefined, IFileNode[], number];
  if (root[c].kind() === "file" || !root[c].children) return undefined;
  return fileParent(
    root[c].children as IFileNode[],
    path.slice(1),
    maxDepth !== undefined ? maxDepth - 1 : undefined,
    root[c]
  );
}

export function fileSimbling(
  root: IFileNode[],
  path: string[],
  maxDepth?: number
) {
  const ret = fileParent(root, path, maxDepth, undefined);
  if (!ret) return undefined;
  return [ret[1], ret[2]] as [IFileNode[], number];
}

export function fileDescendent(
  root: IFileNode[],
  path: string[],
  maxDepth?: number
) {
  const s = fileSimbling(root, path, maxDepth);
  if (!s) return undefined;
  return s[0][s[1]];
}

export function fileNextSimbling(
  root: IFileNode[],
  path: string[],
  maxDepth?: number
) {
  const s = fileSimbling(root, path, maxDepth);
  if (!s || s[0].length === s[1]) return undefined;
  const nindex = s[1] + 1;
  if (nindex >= s[0].length) return undefined;
  if (s[0][nindex].kind() === "directory") return undefined;
  return s[0][nindex];
}

export function filePreviousSimbling(
  root: IFileNode[],
  path: string[],
  maxDepth?: number
) {
  const s = fileSimbling(root, path, maxDepth);
  if (!s || s[1] === 0) return undefined;
  const nindex = s[1] - 1;
  if (s[0][nindex].kind() === "directory") return undefined;
  return s[0][nindex];
}

export function execAllNodes<T extends IFileNode>(
  root: T[],
  exec: (node: T) => boolean | void
) {
  root.some((n) => {
    if (exec(n) === true) return true;
    const walkTree = (item: T) => {
      if (exec(item) === true) return true;
      item.kind() === "directory" &&
        (item.children as T[] | undefined)?.some(walkTree);
    };
    n.kind() === "directory" && (n.children as T[] | undefined)?.some(walkTree);
  });
}

export function filterNodes(
  root: IFileNode[],
  filter: (file: IFileNode) => boolean
) {
  const walker = (nodes: IFileNode[]) => {
    const filtered: IFileNodeRef[] = nodes
      .filter((f) => filter(f))
      .map((f) => ({
        file: f,
        children:
          f.kind() === "directory" && f.children
            ? walker(f.children)
            : undefined,
      }));
    return filtered;
  };

  return walker(root);
}

export function findNode<T extends IFileNode>(
  root: T[],
  find: (node: T) => boolean
) {
  let item: T | undefined = undefined;
  execAllNodes(root, (n) => {
    if (find(n)) {
      item = n;
      return true;
    }
  });
  return item as T | undefined;
}

export function findAllNodes(
  root: IFileNode[],
  find: (node: IFileNode) => boolean
) {
  let item: IFileNode[] = [];
  execAllNodes(root, (n) => {
    if (find(n)) item.push(n);
  });
  return item;
}

export function findNodeAndParent(
  root: IFileNode[],
  find: (node: IFileNode) => boolean
) {
  let item: [IFileNode, IFileNode] | undefined = undefined;
  execAllNodes(root, (n) => {
    const child = n.children?.find((f) => find(f));
    if (child) {
      item = [n, child];
      return true;
    }
  });
  return item as [IFileNode, IFileNode] | undefined;
}

export function findAllNodeAndParent(
  root: IFileNode[],
  find: (node: IFileNode) => boolean
) {
  let item: [IFileNode, IFileNode][] = [];
  execAllNodes(root, (n) => {
    const child = n.children?.find((f) => find(f));
    if (child) item.push([n, child]);
  });
  return item;
}

export function findPattern(root: IFileNode[], pattern: string) {
  let item: IFileNode[] = [];
  const regexp = new RegExp(`${pattern}`, "i");
  execAllNodes(root, (n) => {
    if (regexp.test(n.name)) item.push(n);
  });
  return item;
}

export function clearTreeNodeData(root: IFileNode[]) {
  execAllNodes(root, (n) => n.clear());
}

export function removeTreeNode(
  root: IFileNode[],
  find: (node: IFileNode) => boolean
) {
  const f = findNodeAndParent(root, find);
  if (!f) return undefined;
  f[0].children = f[0].children?.filter((c) => {
    const ret = c !== f[1];
    if (ret) clearTreeNodeData([c]);
    return ret;
  });
  return [f[0], f[1]];
}

export function removeNode(root: IFileNode[], path: string[]) {
  const ret = fileParent(root, path);
  if (!ret) return undefined;
  const [parent, simblings, index] = ret;
  if (parent)
    parent.children = simblings.filter((f, i) => {
      const ret = i !== index;
      if (ret) clearTreeNodeData([f]);
      return ret;
    });
  return [parent, simblings[index]] as [IFileNode, IFileNode];
}

export function isDescendent(parent: IFileNode, child: IFileNode) {
  if (parent.kind() === "file" || !parent.children) return false;
  if (child.path.length <= parent.path.length) return false;
  return parent.path.every((p, i) => p === child.path[i]);
}
