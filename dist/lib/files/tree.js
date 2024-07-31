var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defaultCreateTreeOptions } from "./constants";
import { GDriveFile } from "./nodeTypes/gdriveFile";
import { FileNode } from "./nodeTypes/localFileSystem";
import { oldFileNodeDirectory, oldFileNodeFile } from "./nodeTypes/localOldAPI";
function createTree(root, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (root.kind() !== "directory")
            throw new Error("Not a directory");
        if ((options === null || options === void 0 ? void 0 : options.maxDepth) !== undefined && options.maxDepth <= 0)
            return root;
        const opt = Object.assign(Object.assign({}, defaultCreateTreeOptions), options);
        root.children = yield root.getChildren({
            force: opt.force,
            filter: opt.filter,
            sort: opt.sort,
        });
        const p = root.children
            .filter((c) => c.kind() === "directory")
            .map((c) => createTree(c, Object.assign(Object.assign({}, opt), { maxDepth: opt.maxDepth ? opt.maxDepth - 1 : undefined })));
        yield Promise.all(p);
        return root;
    });
}
export function createTreeNewAPI(dirHandle_1, baseDir_1) {
    return __awaiter(this, arguments, void 0, function* (dirHandle, baseDir, options = {}) {
        var _a, _b;
        const opt = Object.assign(Object.assign({}, defaultCreateTreeOptions), options);
        const tree = yield createTree(new FileNode(dirHandle, (_a = baseDir === null || baseDir === void 0 ? void 0 : baseDir.path) !== null && _a !== void 0 ? _a : []), opt);
        if (baseDir)
            (_b = baseDir.children) === null || _b === void 0 ? void 0 : _b.push(tree);
        return tree;
    });
}
function createOldFileTree(file, root, path, depth) {
    if (depth === path.length - 1) {
        root.children.push(file);
        return;
    }
    let f = root.children.find((t) => t.name === path[depth]);
    if (!f) {
        f = new oldFileNodeDirectory(path.slice(0, depth + 1));
        root.children.push(f);
    }
    createOldFileTree(file, f, path, depth + 1);
}
function createOldTree(files, basePath = [], options) {
    const root = new oldFileNodeDirectory([], []);
    Array.from(files).forEach((f) => {
        const nf = new oldFileNodeFile(f, basePath);
        if (!options.filter(nf))
            return;
        createOldFileTree(nf, root, nf.path, basePath.length);
    });
    if (options.sort)
        sortAllTree(root, options.sort);
    return root.children[0];
}
function sortAllTree(root, sort) {
    if (root.kind() !== "directory" || root.children === undefined)
        return;
    root.children = sort(root.children);
    root.children
        .filter((t) => t.kind() === "directory")
        .forEach((f) => sortAllTree(f, sort));
}
export function createTreeOldAPI(files, baseDir, options = {}) {
    var _a, _b;
    const opt = Object.assign(Object.assign({}, defaultCreateTreeOptions), options);
    const tree = createOldTree(files, (_a = baseDir === null || baseDir === void 0 ? void 0 : baseDir.path) !== null && _a !== void 0 ? _a : [], opt);
    if (baseDir)
        (_b = baseDir.children) === null || _b === void 0 ? void 0 : _b.push(tree);
    return tree;
}
export function createTreeGDrive(files_1, baseDir_1) {
    return __awaiter(this, arguments, void 0, function* (files, baseDir, options = {}) {
        var _a, _b;
        const opt = Object.assign(Object.assign({}, defaultCreateTreeOptions), options);
        const tree = yield createTree(new GDriveFile(files, (_a = baseDir === null || baseDir === void 0 ? void 0 : baseDir.path) !== null && _a !== void 0 ? _a : []), opt);
        if (baseDir)
            (_b = baseDir.children) === null || _b === void 0 ? void 0 : _b.push(tree);
        return tree;
    });
}
