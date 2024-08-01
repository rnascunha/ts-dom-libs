// Based on
// https://gist.github.com/tpae/72e1c54471e88b689f85ad2b3940a8f0
class TrieNode {
    constructor(_key, _data = []) {
        this._key = _key;
        this._data = _data;
        this._key = _key;
        this._data = _data;
        this.parent = null;
        this.children = {};
        this.end = false;
    }
    set data(data) {
        this.data.push(data);
    }
    get key() {
        let output = [];
        let node = this;
        while (node !== null) {
            output.unshift(node._key);
            node = node.parent;
        }
        return output.join("");
    }
    get entrie() {
        const key = this.key;
        return [key, this._data];
    }
    get data() {
        return this._data;
    }
}
export default class MultiTrie {
    constructor() {
        this.root = new TrieNode(null);
    }
    insert(key, data) {
        let node = this.root;
        for (let i = 0; i < key.length; i++) {
            if (!node.children[key[i]]) {
                node.children[key[i]] = new TrieNode(key[i]);
                node.children[key[i]].parent = node;
            }
            node = node.children[key[i]];
            if (i === key.length - 1) {
                node.end = true;
                node.data = data;
            }
        }
    }
    contains(key) {
        let node = this.root;
        for (let i = 0; i < key.length; ++i) {
            if (node.children[key[i]]) {
                node = node.children[key[i]];
            }
            else {
                return false;
            }
        }
        return node.end;
    }
    find(prefix) {
        let node = this.root;
        let output = [];
        for (let i = 0; i < prefix.length; ++i) {
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            }
            else {
                return output;
            }
        }
        findAllEntries(node, output);
        return output;
    }
}
function findAllEntries(node, arr) {
    if (node.end) {
        arr.unshift(node.entrie);
    }
    for (const child in node.children) {
        findAllEntries(node.children[child], arr);
    }
}
