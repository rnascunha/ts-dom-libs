// https://web.dev/patterns/files/open-a-directory

import { defaultCreateTreeOptions } from "./contants";
import { createTreeNewAPI, createTreeOldAPI } from "./tree";
import { CreateTreeOptions, IFileNode } from "./types";

export function getDirectoryHandler(mode: FileSystemPermissionMode) {
  return showDirectoryPicker({
    mode,
  });
}

export function supportsFileSystemAccess() {
  return (
    "showDirectoryPicker" in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })()
  );
}

export function oldFileSystemAccess() {
  return new Promise((resolve, reject) => {
    const input: HTMLInputElement = document.createElement("input");
    input.type = "file";
    input.webkitdirectory = true;

    input.addEventListener("change", () => {
      if (input.files) resolve(input.files);
      else reject(input.files);
    });
    if ("showPicker" in HTMLInputElement.prototype) {
      input.showPicker();
    } else {
      input.click();
    }
  }) as Promise<FileList>;
}

export function filePicker(accept: string, multiple: boolean = false) {
  return new Promise((resolve, reject) => {
    const input: HTMLInputElement = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = accept;

    input.addEventListener("change", () => {
      if (input.files) resolve(input.files);
      else reject(input.files);
    });
    if ("showPicker" in HTMLInputElement.prototype) {
      input.showPicker();
    } else {
      input.click();
    }
  }) as Promise<FileList>;
}

export async function openDirectory(
  mode: FileSystemPermissionMode = "read",
  base?: IFileNode,
  options: Partial<CreateTreeOptions> = {}
) {
  if (supportsFileSystemAccess()) {
    const handler = await getDirectoryHandler(mode);
    const tree = await createTreeNewAPI(handler, base, {
      ...defaultCreateTreeOptions,
      ...options,
    });
    return tree;
  }
  const handler = await oldFileSystemAccess();
  return createTreeOldAPI(handler, base, {
    ...defaultCreateTreeOptions,
    ...options,
  });
}
