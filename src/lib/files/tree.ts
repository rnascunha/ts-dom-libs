import { defaultCreateTreeOptions } from "./contants";
import { GDriveFile } from "./nodeTypes/gdriveFile";
import { FileNode } from "./nodeTypes/localFileSystem";
import { oldFileNodeDirectory, oldFileNodeFile } from "./nodeTypes/localOldAPI";
import { CreateTreeOptions, FileSort, IFileNode } from "./types";

async function createTree(root: IFileNode, options?: CreateTreeOptions) {
  if (root.kind() !== "directory") throw new Error("Not a directory");
  if (options?.maxDepth !== undefined && options.maxDepth <= 0) return root;

  const opt = { ...defaultCreateTreeOptions, ...options };
  root.children = await root.getChildren({
    force: opt.force,
    filter: opt.filter,
    sort: opt.sort,
  });

  const p = root.children
    .filter((c) => c.kind() === "directory")
    .map((c) =>
      createTree(c, {
        ...opt,
        maxDepth: opt.maxDepth ? opt.maxDepth - 1 : undefined,
      })
    );

  await Promise.all(p);
  return root;
}

export async function createTreeNewAPI(
  dirHandle: FileSystemDirectoryHandle,
  baseDir?: IFileNode,
  options: Partial<CreateTreeOptions> = {}
) {
  const opt = { ...defaultCreateTreeOptions, ...options };
  const tree = await createTree(
    new FileNode(dirHandle, baseDir?.path ?? []),
    opt
  );
  if (baseDir) baseDir.children?.push(tree);
  return tree;
}

function createOldFileTree(
  file: oldFileNodeFile,
  root: oldFileNodeDirectory,
  path: string[],
  depth: number
) {
  if (depth === path.length - 1) {
    root.children.push(file);
    return;
  }
  let f = root.children.find((t) => t.name === path[depth]);
  if (!f) {
    f = new oldFileNodeDirectory(path.slice(0, depth + 1));
    root.children.push(f);
  }

  createOldFileTree(file, f as oldFileNodeDirectory, path, depth + 1);
}

function createOldTree(
  files: FileList,
  basePath: string[] = [],
  options: CreateTreeOptions
) {
  const root = new oldFileNodeDirectory([], []);
  Array.from(files).forEach((f) => {
    const nf = new oldFileNodeFile(f, basePath);
    if (!options.filter(nf)) return;
    createOldFileTree(nf, root, nf.path, basePath.length);
  });

  if (options.sort) sortAllTree(root, options.sort);

  return root.children[0];
}

function sortAllTree(root: IFileNode, sort: FileSort) {
  if (root.kind() !== "directory" || root.children === undefined) return;
  root.children = sort(root.children);
  root.children
    .filter((t) => t.kind() === "directory")
    .forEach((f) => sortAllTree(f, sort));
}

export function createTreeOldAPI(
  files: FileList,
  baseDir?: IFileNode,
  options: Partial<CreateTreeOptions> = {}
) {
  const opt = { ...defaultCreateTreeOptions, ...options };
  const tree = createOldTree(files, baseDir?.path ?? [], opt);
  if (baseDir) baseDir.children?.push(tree);
  return tree;
}

export async function createTreeGDrive(
  files: gapi.client.drive.File,
  baseDir?: IFileNode,
  options: Partial<CreateTreeOptions> = {}
) {
  const opt = { ...defaultCreateTreeOptions, ...options };
  const tree = await createTree(
    new GDriveFile(files, baseDir?.path ?? []),
    opt
  );
  if (baseDir) baseDir.children?.push(tree);
  return tree;
}
