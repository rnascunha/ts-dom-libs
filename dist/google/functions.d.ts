export declare function gsiCallbackAllScopes(response: google.accounts.oauth2.TokenResponse, scopes: readonly string[], onSuccess: (resp: google.accounts.oauth2.TokenResponse) => void, onError?: (error: string) => void): void;
export declare function gsiScriptLoad(client_id: string, scopes: readonly string[], onCallback: (response: google.accounts.oauth2.TokenResponse) => void): google.accounts.oauth2.TokenClient;
export declare function gapiScriptLoad(apiKey: string, discoveryDocs: string[], onLoad?: () => void): void;
export declare function signIn(token: google.accounts.oauth2.TokenClient): void;
export declare function signOut(onSignOut: () => void): void;
