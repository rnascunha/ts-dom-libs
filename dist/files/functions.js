export function fileParent(root, path, maxDepth, parent = undefined) {
    if (path.length === 0 || (maxDepth !== undefined && maxDepth <= 0))
        return undefined;
    const c = root.findIndex((f) => f.name === path[0]);
    if (c === -1)
        return undefined;
    if (path.length === 1)
        return [parent, root, c];
    if (root[c].kind() === "file" || !root[c].children)
        return undefined;
    return fileParent(root[c].children, path.slice(1), maxDepth !== undefined ? maxDepth - 1 : undefined, root[c]);
}
export function fileSimbling(root, path, maxDepth) {
    const ret = fileParent(root, path, maxDepth, undefined);
    if (!ret)
        return undefined;
    return [ret[1], ret[2]];
}
export function fileDescendent(root, path, maxDepth) {
    const s = fileSimbling(root, path, maxDepth);
    if (!s)
        return undefined;
    return s[0][s[1]];
}
export function fileNextSimbling(root, path, maxDepth) {
    const s = fileSimbling(root, path, maxDepth);
    if (!s || s[0].length === s[1])
        return undefined;
    const nindex = s[1] + 1;
    if (nindex >= s[0].length)
        return undefined;
    if (s[0][nindex].kind() === "directory")
        return undefined;
    return s[0][nindex];
}
export function filePreviousSimbling(root, path, maxDepth) {
    const s = fileSimbling(root, path, maxDepth);
    if (!s || s[1] === 0)
        return undefined;
    const nindex = s[1] - 1;
    if (s[0][nindex].kind() === "directory")
        return undefined;
    return s[0][nindex];
}
export function execAllNodes(root, exec) {
    root.some((n) => {
        var _a;
        if (exec(n) === true)
            return true;
        const walkTree = (item) => {
            var _a;
            if (exec(item) === true)
                return true;
            item.kind() === "directory" &&
                ((_a = item.children) === null || _a === void 0 ? void 0 : _a.some(walkTree));
        };
        n.kind() === "directory" && ((_a = n.children) === null || _a === void 0 ? void 0 : _a.some(walkTree));
    });
}
export function filterNodes(root, filter) {
    const walker = (nodes) => {
        const filtered = nodes
            .filter((f) => filter(f))
            .map((f) => ({
            file: f,
            children: f.kind() === "directory" && f.children
                ? walker(f.children)
                : undefined,
        }));
        return filtered;
    };
    return walker(root);
}
export function findNode(root, find) {
    let item = undefined;
    execAllNodes(root, (n) => {
        if (find(n)) {
            item = n;
            return true;
        }
    });
    return item;
}
export function findAllNodes(root, find) {
    let item = [];
    execAllNodes(root, (n) => {
        if (find(n))
            item.push(n);
    });
    return item;
}
export function findNodeAndParent(root, find) {
    let item = undefined;
    execAllNodes(root, (n) => {
        var _a;
        const child = (_a = n.children) === null || _a === void 0 ? void 0 : _a.find((f) => find(f));
        if (child) {
            item = [n, child];
            return true;
        }
    });
    return item;
}
export function findAllNodeAndParent(root, find) {
    let item = [];
    execAllNodes(root, (n) => {
        var _a;
        const child = (_a = n.children) === null || _a === void 0 ? void 0 : _a.find((f) => find(f));
        if (child)
            item.push([n, child]);
    });
    return item;
}
export function findPattern(root, pattern) {
    let item = [];
    const regexp = new RegExp(`${pattern}`, "i");
    execAllNodes(root, (n) => {
        if (regexp.test(n.name))
            item.push(n);
    });
    return item;
}
export function clearTreeNodeData(root) {
    execAllNodes(root, (n) => n.clear());
}
export function removeTreeNode(root, find) {
    var _a;
    const f = findNodeAndParent(root, find);
    if (!f)
        return undefined;
    f[0].children = (_a = f[0].children) === null || _a === void 0 ? void 0 : _a.filter((c) => {
        const ret = c !== f[1];
        if (ret)
            clearTreeNodeData([c]);
        return ret;
    });
    return [f[0], f[1]];
}
export function removeNode(root, path) {
    const ret = fileParent(root, path);
    if (!ret)
        return undefined;
    const [parent, simblings, index] = ret;
    if (parent)
        parent.children = simblings.filter((f, i) => {
            const ret = i !== index;
            if (ret)
                clearTreeNodeData([f]);
            return ret;
        });
    return [parent, simblings[index]];
}
export function isDescendent(parent, child) {
    if (parent.kind() === "file" || !parent.children)
        return false;
    if (child.path.length <= parent.path.length)
        return false;
    return parent.path.every((p, i) => p === child.path[i]);
}
