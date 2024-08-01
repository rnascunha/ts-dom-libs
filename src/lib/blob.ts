/**
 * String blob is a blob but "wrongly" received as a string.
 */
export function stringBlobToBlob(
  stringBlob: string,
  type: string = "application/octet-binary"
) {
  const charArray = new Array(stringBlob.length);
  for (let i = 0; i < stringBlob.length; i++) {
    charArray[i] = stringBlob.charCodeAt(i);
  }
  const typedArray = new Uint8Array(charArray);

  const blob = new Blob([typedArray], {
    type,
  });
  return blob;
}

export function blobToURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = function () {
      if (fr.result) resolve(fr.result as string);
      else reject(new Error("Error reading file"));
    };
    fr.onerror = function () {
      reject(new Error("Error reading file"));
    };
    fr.readAsDataURL(blob);
  });
}
