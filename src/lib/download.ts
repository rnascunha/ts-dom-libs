export function download(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function open_link(url: string, target: string = "_self") {
  const a = document.createElement("a");
  a.href = url;
  a.target = target;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

}

export function download_string_as_file(
  str: string,
  name: string,
  type = "text/plain"
) {
  const a = document.createElement("a");
  a.href = `data:${type};charset=utf-8, ${encodeURIComponent(str)}`;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
