// Based on
// https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0

class TrieNode<T> {
  public parent: TrieNode<T> | null;
  public children: Record<string, TrieNode<T>>;
  public end: boolean;

  constructor(
    private readonly _key: string | null,
    private readonly _data: T[] = []
  ) {
    this._key = _key;
    this._data = _data;
    this.parent = null;
    this.children = {};
    this.end = false;
  }

  set data(data: T) {
    this.data.push(data);
  }

  get key() {
    let output: string[] = [];
    let node: TrieNode<T> = this;

    while (node !== null) {
      output.unshift(node._key as string);
      node = node.parent as TrieNode<T>;
    }

    return output.join("");
  }

  get entrie(): [string, T[]] {
    const key = this.key;
    return [key, this._data];
  }

  get data(): T[] {
    return this._data;
  }
}

export default class MultiTrie<T> {
  public root: TrieNode<T>;

  constructor() {
    this.root = new TrieNode(null);
  }

  insert(key: string, data: T) {
    let node = this.root;

    for (let i = 0; i < key.length; i++) {
      if (!node.children[key[i]]) {
        node.children[key[i]] = new TrieNode<T>(key[i]);
        node.children[key[i]].parent = node;
      }

      node = node.children[key[i]];

      if (i === key.length - 1) {
        node.end = true;
        node.data = data;
      }
    }
  }

  contains(key: string) {
    let node = this.root;

    for (let i = 0; i < key.length; ++i) {
      if (node.children[key[i]]) {
        node = node.children[key[i]];
      } else {
        return false;
      }
    }
    return node.end;
  }

  find(prefix: string) {
    let node = this.root;
    let output:[string, T[]][] = [];

    for (let i = 0; i < prefix.length; ++i) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        return output;
      }
    }

    findAllEntries(node, output);

    return output;
  }
}

function findAllEntries<T>(node: TrieNode<T>, arr: [string, T[]][]) {
  if (node.end) {
    arr.unshift(node.entrie);
  }

  for (const child in node.children) {
    findAllEntries(node.children[child], arr);
  }
}