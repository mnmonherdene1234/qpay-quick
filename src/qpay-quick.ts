class QPayQuick {
  private static instance: QPayQuick;

  private username: string = "TEST_VENDOR_MERCHANT";
  private password: string = "123456";
  private accessToken: string = "";
  private expiresIn: Date = new Date();
  private refreshExpiresIn: Date = new Date();
  private refreshToken: string = "";
  private _host: string = "https://sandbox-quickqr.qpay.mn";

  get host() {
    return this._host;
  }

  private constructor() {}

  public static getInstance(): QPayQuick {
    if (!QPayQuick.instance) {
      QPayQuick.instance = new QPayQuick();
      QPayQuick.instance.token();
      setInterval(QPayQuick.instance.checkExpiration, 1000 * 60);
    }

    return QPayQuick.instance;
  }

  async token() {
    const response = await fetch(`${this._host}/v2/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${this.username}:${this.password}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        terminal_id: "1679466041",
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      const tokenResponse = new TokenResponse({
        token_type: data["token_type"],
        refresh_expires_in: data["refresh_expires_in"],
        refresh_token: data["refresh_token"],
        access_token: data["access_token"],
        expires_in: data["expires_in"],
        scope: data["scope"],
        session_state: data["session_state"],
      });

      this.accessToken = tokenResponse.access_token;
      this.refreshToken = tokenResponse.refresh_token;
      this.expiresIn = new Date(tokenResponse.expires_in * 1000);
      this.refreshExpiresIn = new Date(tokenResponse.refresh_expires_in * 1000);
    } else {
      throw new Error(JSON.stringify(await response.json()));
    }
  }

  async refresh() {
    const response = await fetch(`${this._host}/v2/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.refreshToken}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();

      const tokenResponse = new TokenResponse({
        token_type: data["token_type"],
        refresh_expires_in: data["refresh_expires_in"],
        refresh_token: data["refresh_token"],
        access_token: data["access_token"],
        expires_in: data["expires_in"],
        scope: data["scope"],
        session_state: data["session_state"],
      });

      this.accessToken = tokenResponse.access_token;
      this.refreshToken = tokenResponse.refresh_token;
      this.expiresIn = new Date(tokenResponse.expires_in * 1000);
      this.refreshExpiresIn = new Date(tokenResponse.refresh_expires_in * 1000);
    } else {
      throw new Error(JSON.stringify(await response.json()));
    }
  }

  async checkExpiration() {
    const expiresDate = new Date(this.expiresIn);
    expiresDate.setHours(expiresDate.getHours() - 1, 0, 0, 0);
    const now = new Date();

    if (now > expiresDate) {
      await this.refresh();
    }
  }
}

export default QPayQuick;

export class TokenResponse {
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

export class QPayInvoice {
  merchant_id: string = "";
  amount: number = 0;
  currency: string = "";
  customer_name: string = "";
  customer_logo: string = "";
  call_back_url: string = "";
  description: string = "";
  mcc_code: string = "";
  back_accounts: BankAccount[] = [];

  constructor({
    merchant_id = "",
    amount = 0,
    currency = "",
    customer_name = "",
    customer_logo = "",
    call_back_url = "",
    description = "",
    mcc_code = "",
    back_accounts = [],
  }: {
    merchant_id: string;
    amount: number;
    currency: string;
    customer_name: string;
    customer_logo: string;
    call_back_url: string;
    description: string;
    mcc_code: string;
    back_accounts: BankAccount[];
  }) {
    this.merchant_id = merchant_id;
    this.amount = amount;
    this.currency = currency;
    this.customer_name = customer_name;
    this.customer_logo = customer_logo;
    this.call_back_url = call_back_url;
    this.description = description;
    this.mcc_code = mcc_code;
    this.back_accounts = back_accounts;
  }
}

export class BankAccount {
  default: boolean = true;
  account_back_code: string = "";
  account_number: string = "";
  account_name: string = "";
  is_default: boolean = true;

  constructor({
    $default = true,
    account_back_code = "",
    account_number = "",
    account_name = "",
    is_default = true,
  }: {
    $default?: boolean;
    account_back_code?: string;
    account_number?: string;
    account_name?: string;
    is_default?: boolean;
  }) {
    this.default = $default;
    this.account_back_code = account_back_code;
    this.account_number = account_number;
    this.account_name = account_name;
    this.is_default = is_default;
  }
}
