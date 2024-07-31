export const defaultGetChildrenOptions = {
    force: false,
    filter: () => true,
    sort: (n) => n,
};
export const defaultCreateTreeOptions = Object.assign(Object.assign({}, defaultGetChildrenOptions), { maxDepth: undefined });
export const defaultThumbnailOptions = {
    scale: 0.1,
};
