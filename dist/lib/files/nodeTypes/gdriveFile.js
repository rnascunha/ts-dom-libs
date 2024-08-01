var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defaultGetChildrenOptions, defaultThumbnailOptions, } from "../constants";
import { resizeImageDataURL } from "../../image";
import { blobToURL, stringBlobToBlob } from "../../blob";
export class GDriveFile {
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
        return this._handle.mimeType;
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
        if (this.kind() !== "directory")
            throw new Error("Not a directory");
        return this._children;
    }
    set children(childs) {
        if (this.kind() !== "directory")
            throw new Error("Not a directory");
        this._children = childs;
    }
    getChildren() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            if (this.kind() === "file")
                throw new Error("Not a directory");
            const opt = Object.assign(Object.assign({}, defaultGetChildrenOptions), options);
            if (!opt.force && this._children !== undefined)
                return this._children;
            const response = yield gapi.client.drive.files.list({
                q: `('${this._handle.id}' in parents) and (mimeType = 'application/vnd.google-apps.folder' or mimeType contains 'image/') and trashed = false`,
                fields: "files(id, name, mimeType, shared)",
                spaces: "drive",
            });
            if (response.status !== 200)
                throw new Error(`Erro reading files [${response.result.error.message}]`);
            this._children = [];
            for (const entry of response.result.files) {
                const newChild = new GDriveFile(entry, this.path);
                if (opt.filter(newChild))
                    this._children.push(new GDriveFile(entry, this.path));
            }
            this._children = opt.sort(this._children);
            return this._children;
        });
    }
    kind() {
        return this._handle.mimeType === "application/vnd.google-apps.folder"
            ? "directory"
            : "file";
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._data)
                return this._data;
            if (this.kind() === "directory")
                return undefined;
            if (this._handle.shared)
                return `https://drive.google.com/uc?export=view&id=${this._handle.id}`;
            let response;
            try {
                response = yield gapi.client.drive.files.get({
                    fileId: this._handle.id,
                    alt: "media",
                });
            }
            catch (e) {
                const error = e
                    .result;
                throw error.error;
            }
            try {
                this._data = yield responseToDataURL(response);
                return this._data;
            }
            catch (e) {
                throw e.message;
            }
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
            if (this._handle.shared)
                return `https://drive.google.com/thumbnail?sz=w100&id=${this._handle.id}`;
            const data = yield this.data();
            this._thumbnail = yield resizeImageDataURL(data, defaultThumbnailOptions);
            return this._thumbnail;
        });
    }
}
export function responseToDataURL(response) {
    var _a;
    const blob = stringBlobToBlob(response.body, (_a = response.headers) === null || _a === void 0 ? void 0 : _a["Content-Type"]);
    return blobToURL(blob);
}
