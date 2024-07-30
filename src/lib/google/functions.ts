export function gsiCallbackAllScopes(
  response: google.accounts.oauth2.TokenResponse,
  scopes: readonly string[],
  onSuccess: (resp: google.accounts.oauth2.TokenResponse) => void,
  onError?: (error: string) => void
) {
  if (response.error !== undefined) {
    onError?.(response.error);
    throw response;
  }
  if (
    google.accounts.oauth2.hasGrantedAllScopes(
      response,
      scopes[0],
      ...scopes.slice(1)
    )
  )
    onSuccess(response);
  else onError?.("It's necessary to accept all permissions.");
}

export function gsiScriptLoad(
  client_id: string,
  scopes: readonly string[],
  onCallback: (response: google.accounts.oauth2.TokenResponse) => void
) {
  const token = google.accounts.oauth2.initTokenClient({
    client_id,
    scope: scopes.join(" "),
    callback: onCallback,
  });

  return token;
}

export function gapiScriptLoad(apiKey: string, discoveryDocs: string[], onLoad?: () => void) {
  gapi.load("client", async () => {
    await gapi.client.init({
      apiKey,
      discoveryDocs,
    });
    onLoad?.();
  });
}

export function signIn(token: google.accounts.oauth2.TokenClient) {
  token.requestAccessToken();
}

export function signOut(onSignOut: () => void) {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token, onSignOut);
    gapi.client.setToken(null);
  }
}
