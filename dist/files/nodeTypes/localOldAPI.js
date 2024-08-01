var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { uploadFileList } from "../../upload_file";
import { defaultGetChildrenOptions, defaultThumbnailOptions, } from "../constants";
import { resizeImageDataURL } from "../../image";
export class oldFileNode {
    constructor(file) {
        this._file = file;
    }
    get name() {
        return this._file.name;
    }
    get type() {
        return this._file.type;
    }
    get path() {
        return this._file.path;
    }
    get path_string() {
        return this._file.path_string;
    }
    get children() {
        return this._file.children;
    }
    getChildren() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            return this._file.getChildren(options);
        });
    }
    kind() {
        return this._file.kind();
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._file.data();
        });
    }
    clear() {
        return this._file.clear();
    }
    thumbnail() {
        return this._file.thumbnail();
    }
}
export class oldFileNodeFile {
    constructor(handle, basePath = []) {
        this._data = undefined;
        this._thumbnail = undefined;
        this._handle = handle;
        this._path = [
            ...basePath,
            ...(handle.webkitRelativePath === "" // When adding single files (not directories)
                ? [handle.name]
                : handle.webkitRelativePath.split("/")),
        ];
    }
    get handle() {
        return this._handle;
    }
    get type() {
        return this._handle.type;
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
        throw new Error("Not a directory");
    }
    getChildren(options = {}) {
        throw new Error("Not a directory");
    }
    kind() {
        return "file";
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._data)
                return this._data;
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
export class oldFileNodeDirectory {
    constructor(path, children = []) {
        this._path = path;
        this._children = children;
    }
    get name() {
        return this._path[this._path.length - 1];
    }
    get type() {
        return "directory";
    }
    get path() {
        return this._path;
    }
    get path_string() {
        return this._path.join("/");
    }
    get children() {
        return this._children;
    }
    set children(children) {
        this._children = children;
    }
    getChildren() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const opt = Object.assign(Object.assign({}, defaultGetChildrenOptions), { options });
            const c = this._children.filter(opt.filter);
            this._children = opt.sort(c);
            return this._children;
        });
    }
    kind() {
        return "directory";
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not a file");
        });
    }
    clear() { }
    thumbnail() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not a file");
        });
    }
}
