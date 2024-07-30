import { clamp } from "./math";

export function resizeImage(original: HTMLImageElement, scale: number) {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;

  canvas.width = original.width * scale;
  canvas.height = original.height * scale;

  canvas
    .getContext("2d")
    ?.drawImage(original, 0, 0, canvas.width, canvas.height);

  return canvas;
}

export function createImage(src: string) {
  const img = document.createElement("img");
  img.src = src;
  return img;
}

export interface ResizeImageOptions {
  scale: number; // 0 .. 1
  outputType?: string; // mime output type. Defaulted: 'image/png',
  quality?: number; // 0 .. 1
}

export async function resizeImageDataURL(
  dataURL: string,
  opt: ResizeImageOptions
) {
  if (!dataURL.startsWith("data:image/")) throw new Error("Not dataURL image");

  const img = createImage(dataURL);
  await img.decode();
  const canvas = resizeImage(img, clamp(opt.scale, 0, 1));
  const outputType =
    opt.outputType ??
    dataURL.slice(dataURL.indexOf(":") + 1, dataURL.indexOf(";"));
  return canvas.toDataURL(
    outputType,
    opt.quality ? clamp(opt.quality, 0, 1) : 1
  );
}
