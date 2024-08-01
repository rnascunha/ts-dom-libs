var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { clamp } from "./math";
export function resizeImage(original, scale) {
    var _a;
    const canvas = document.createElement("canvas");
    canvas.width = original.width * scale;
    canvas.height = original.height * scale;
    (_a = canvas
        .getContext("2d")) === null || _a === void 0 ? void 0 : _a.drawImage(original, 0, 0, canvas.width, canvas.height);
    return canvas;
}
export function createImage(src) {
    const img = document.createElement("img");
    img.src = src;
    return img;
}
export function resizeImageDataURL(dataURL, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!dataURL.startsWith("data:image/"))
            throw new Error("Not dataURL image");
        const img = createImage(dataURL);
        yield img.decode();
        const canvas = resizeImage(img, clamp(opt.scale, 0, 1));
        const outputType = (_a = opt.outputType) !== null && _a !== void 0 ? _a : dataURL.slice(dataURL.indexOf(":") + 1, dataURL.indexOf(";"));
        return canvas.toDataURL(outputType, opt.quality ? clamp(opt.quality, 0, 1) : 1);
    });
}
