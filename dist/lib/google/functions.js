var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function gsiCallbackAllScopes(response, scopes, onSuccess, onError) {
    if (response.error !== undefined) {
        onError === null || onError === void 0 ? void 0 : onError(response.error);
        throw response;
    }
    if (google.accounts.oauth2.hasGrantedAllScopes(response, scopes[0], ...scopes.slice(1)))
        onSuccess(response);
    else
        onError === null || onError === void 0 ? void 0 : onError("It's necessary to accept all permissions.");
}
export function gsiScriptLoad(client_id, scopes, onCallback) {
    const token = google.accounts.oauth2.initTokenClient({
        client_id,
        scope: scopes.join(" "),
        callback: onCallback,
    });
    return token;
}
export function gapiScriptLoad(apiKey, discoveryDocs, onLoad) {
    gapi.load("client", () => __awaiter(this, void 0, void 0, function* () {
        yield gapi.client.init({
            apiKey,
            discoveryDocs,
        });
        onLoad === null || onLoad === void 0 ? void 0 : onLoad();
    }));
}
export function signIn(token) {
    token.requestAccessToken();
}
export function signOut(onSignOut) {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token, onSignOut);
        gapi.client.setToken(null);
    }
}
