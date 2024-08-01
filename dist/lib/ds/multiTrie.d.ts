declare class TrieNode<T> {
    private readonly _key;
    private readonly _data;
    parent: TrieNode<T> | null;
    children: Record<string, TrieNode<T>>;
    end: boolean;
    constructor(_key: string | null, _data?: T[]);
    set data(data: T);
    get key(): string;
    get entrie(): [string, T[]];
    get data(): T[];
}
export default class MultiTrie<T> {
    root: TrieNode<T>;
    constructor();
    insert(key: string, data: T): void;
    contains(key: string): boolean;
    find(prefix: string): [string, T[]][];
}
export {};
