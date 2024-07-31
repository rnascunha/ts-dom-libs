// https://caniuse.com/?search=requestfullscreen
// https://www.w3schools.com/howto/howto_js_fullscreen.asp
export function openFullscreen(elem = document.documentElement) {
    elem.requestFullscreen();
}
export function closeFullscreen() {
    document.exitFullscreen();
}
export function isFullScreen() {
    return document.fullscreenElement !== null;
}
