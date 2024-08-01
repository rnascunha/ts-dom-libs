var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function uploadFileList(files) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!FileReader) {
                reject(new Error("FileReader API not supported"));
                return;
            }
            const fr = new FileReader();
            fr.onload = function () {
                if (fr.result)
                    resolve({ data: fr.result, files: files });
                else
                    reject(new Error("Error reading file"));
            };
            fr.onerror = function () {
                reject(new Error("Error reading file"));
            };
            fr.readAsDataURL(files instanceof FileList ? files[0] : files);
        });
    });
}
export function uploadFileListArrayBuffer(files) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!FileReader) {
                reject(new Error("FileReader API not supported"));
                return;
            }
            const fr = new FileReader();
            fr.onload = function () {
                if (fr.result)
                    resolve({ data: fr.result, files: files });
                else
                    reject(new Error("Error reading file"));
            };
            fr.onerror = function () {
                reject(new Error("Error reading file"));
            };
            fr.readAsArrayBuffer(files instanceof FileList ? files[0] : files);
        });
    });
}
