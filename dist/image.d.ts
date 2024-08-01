export declare function resizeImage(original: HTMLImageElement, scale: number): HTMLCanvasElement;
export declare function createImage(src: string): HTMLImageElement;
export interface ResizeImageOptions {
    scale: number;
    outputType?: string;
    quality?: number;
}
export declare function resizeImageDataURL(dataURL: string, opt: ResizeImageOptions): Promise<string>;
