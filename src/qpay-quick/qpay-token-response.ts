export default class QPayTokenResponse {
  token_type: string = "";
  refresh_expires_in: number = 0;
  refresh_token: string = "";
  access_token: string = "";
  expires_in: number = 0;
  scope: string = "";
  session_state: string = "";

  constructor({
    token_type = "",
    refresh_expires_in = 0,
    refresh_token = "",
    access_token = "",
    expires_in = 0,
    scope = "",
    session_state = "",
  }: {
    token_type?: string;
    refresh_expires_in?: number;
    refresh_token?: string;
    access_token?: string;
    expires_in?: number;
    scope?: string;
    session_state?: string;
  }) {
    this.token_type = token_type;
    this.refresh_expires_in = refresh_expires_in;
    this.refresh_token = refresh_token;
    this.access_token = access_token;
    this.expires_in = expires_in;
    this.scope = scope;
    this.session_state = session_state;
  }
}
