// https://web.dev/patterns/files/open-a-directory
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
import { createTreeNewAPI, createTreeOldAPI } from "./tree";
export function getDirectoryHandler(mode) {
    return showDirectoryPicker({
        mode,
    });
}
export function supportsFileSystemAccess() {
    return ("showDirectoryPicker" in window &&
        (() => {
            try {
                return window.self === window.top;
            }
            catch (_a) {
                return false;
            }
        })());
}
export function oldFileSystemAccess() {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.webkitdirectory = true;
        input.addEventListener("change", () => {
            if (input.files)
                resolve(input.files);
            else
                reject(input.files);
        });
        if ("showPicker" in HTMLInputElement.prototype) {
            input.showPicker();
        }
        else {
            input.click();
        }
    });
}
export function filePicker(accept, multiple = false) {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = multiple;
        input.accept = accept;
        input.addEventListener("change", () => {
            if (input.files)
                resolve(input.files);
            else
                reject(input.files);
        });
        if ("showPicker" in HTMLInputElement.prototype) {
            input.showPicker();
        }
        else {
            input.click();
        }
    });
}
export function openDirectory() {
    return __awaiter(this, arguments, void 0, function* (mode = "read", base, options = {}) {
        if (supportsFileSystemAccess()) {
            const handler = yield getDirectoryHandler(mode);
            const tree = yield createTreeNewAPI(handler, base, Object.assign(Object.assign({}, defaultCreateTreeOptions), options));
            return tree;
        }
        const handler = yield oldFileSystemAccess();
        return createTreeOldAPI(handler, base, Object.assign(Object.assign({}, defaultCreateTreeOptions), options));
    });
}
