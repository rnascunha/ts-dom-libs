declare class TrieNode<T> {
    private readonly _key;
    private _data;
    parent: TrieNode<T> | null;
    children: Record<string, TrieNode<T>>;
    end: boolean;
    constructor(_key: string | null, _data?: T | null);
    set data(d: T | null);
    get key(): string;
    get entrie(): [string, T];
    get data(): T | null;
}
export default class Trie<T> {
    root: TrieNode<T>;
    constructor();
    insert(key: string, data?: T | null): void;
    contains(key: string): boolean;
    find(prefix: string): [string, T][];
}
export {};
