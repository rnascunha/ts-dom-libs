export interface UploadFileArgs<T = string> {
  data: T;
  files: FileList | File;
}

export async function uploadFileList(files: FileList | File) {
  return new Promise<UploadFileArgs>((resolve, reject) => {
    if (!FileReader) {
      reject(new Error("FileReader API not supported"));
      return;
    }

    const fr = new FileReader();
    fr.onload = function () {
      if (fr.result) resolve({ data: fr.result as string, files: files });
      else reject(new Error("Error reading file"));
    };
    fr.onerror = function () {
      reject(new Error("Error reading file"));
    };
    fr.readAsDataURL(files instanceof FileList ? files[0] : files);
  });
}

export async function uploadFileListArrayBuffer(files: FileList | File) {
  return new Promise<UploadFileArgs<ArrayBuffer>>((resolve, reject) => {
    if (!FileReader) {
      reject(new Error("FileReader API not supported"));
      return;
    }

    const fr = new FileReader();
    fr.onload = function () {
      if (fr.result) resolve({ data: fr.result as ArrayBuffer, files: files });
      else reject(new Error("Error reading file"));
    };
    fr.onerror = function () {
      reject(new Error("Error reading file"));
    };
    fr.readAsArrayBuffer(files instanceof FileList ? files[0] : files);
  });
}


