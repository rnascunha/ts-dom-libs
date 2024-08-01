var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { uploadFileList } from "../../upload_file";
import { defaultGetChildrenOptions, defaultThumbnailOptions, } from "../constants";
import { resizeImageDataURL } from "../../image";
export class FileNode {
    constructor(handle, path_parent, children) {
        this._data = undefined;
        this._thumbnail = undefined;
        this._handle = handle;
        this._path = [...path_parent, handle.name];
        this._children = children;
    }
    get handle() {
        return this._handle;
    }
    get type() {
        return this.kind() === "file" ? this._handle.type : "directory";
    }
    get name() {
        return this._handle.name;
    }
    get path() {
        return this._path;
    }
    get path_string() {
        return this._path.join("/");
    }
    get children() {
        if (this.kind() === "file")
            throw new Error("Not a directory");
        return this._children;
    }
    set children(childs) {
        if (this.kind() === "file")
            throw new Error("Not a directory");
        this._children = childs;
    }
    getChildren() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            var _a, e_1, _b, _c;
            if (this.kind() === "file")
                throw new Error("Not a directory");
            const opt = Object.assign(Object.assign({}, defaultGetChildrenOptions), options);
            if (!opt.force && this._children !== undefined)
                return this._children;
            this._children = [];
            try {
                for (var _d = true, _e = __asyncValues(this._handle.values()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const entry = _c;
                    const newEntry = entry instanceof FileSystemFileHandle ? yield entry.getFile() : entry;
                    const newChild = new FileNode(newEntry, this.path);
                    if (opt.filter(newChild))
                        this._children.push(new FileNode(newEntry, this.path));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._children = opt.sort(this._children);
            return this._children;
        });
    }
    kind() {
        return this._handle instanceof File ? "file" : "directory";
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._data)
                return this._data;
            if (this.kind() === "directory")
                return undefined;
            this._data = (yield uploadFileList(this._handle)).data;
            return this._data;
        });
    }
    clear() {
        if (this._data)
            URL.revokeObjectURL(this._data);
    }
    thumbnail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._thumbnail)
                return this._thumbnail;
            const data = yield this.data();
            this._thumbnail = yield resizeImageDataURL(data, defaultThumbnailOptions);
            return this._thumbnail;
        });
    }
}
