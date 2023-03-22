import QPayInvoiceResponse from "./qpay-invoice-response";
import QPayInvoice from "./qpay-invoice";
import QPayInvoiceBankAccount from "./qpay-invoice-bank-account";
import QPayTokenResponse from "./qpay-token-response";

export enum QPayEnvironment {
  Production = "PRODUCTION",
  Development = "DEVELOPMENT",
}

export default class QPayQuick {
  private static instance: QPayQuick;

  private username: string = "";
  private password: string = "";
  private terminalId: string = "";
  private accessToken: string = "";
  private expiresIn: Date = new Date();
  private refreshExpiresIn: Date = new Date();
  private refreshToken: string = "";
  private _host: string = "";
  get host() {
    return this._host;
  }

  private constructor() {}

  public static setup({
    username,
    password,
    terminalId,
    env = QPayEnvironment.Development,
  }: {
    username: string;
    password: string;
    terminalId: string;
    env?: QPayEnvironment;
  }) {
    if (!QPayQuick.instance) {
      QPayQuick.instance = new QPayQuick();
      QPayQuick.instance.username = username;
      QPayQuick.instance.password = password;
      QPayQuick.instance.terminalId = terminalId;

      if (env === QPayEnvironment.Production) {
        QPayQuick.instance._host = "https://quickqr.qpay.mn";
      } else {
        QPayQuick.instance._host = "https://sandbox-quickqr.qpay.mn";
      }

      QPayQuick.instance.token();
    }
  }

  public static getInstance(): QPayQuick {
    if (!QPayQuick.instance) {
      QPayQuick.instance = new QPayQuick();
      setInterval(QPayQuick.instance.checkExpiration, 1000 * 60);
    }

    QPayQuick.instance.token();

    return QPayQuick.instance;
  }

  public static async getInstanceAsync(): Promise<QPayQuick> {
    if (!QPayQuick.instance) {
      QPayQuick.instance = new QPayQuick();
      setInterval(QPayQuick.instance.checkExpiration, 1000 * 60);
    }

    await QPayQuick.instance.token();

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
        terminal_id: this.terminalId,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      const tokenResponse = new QPayTokenResponse({
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

    if (response.ok) {
      const data = await response.json();

      const tokenResponse = new QPayTokenResponse({
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

  async createInvoice(qpayInvoice: QPayInvoice) {
    const response = await fetch(`${this._host}/v2/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(qpayInvoice),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    const invoiceBankAccounts: QPayInvoiceBankAccount[] = [];

    if (Array.isArray(data?.invoice_bank_accounts)) {
      for (const account of data?.invoice_bank_accounts) {
        invoiceBankAccounts.push(
          new QPayInvoiceBankAccount({
            id: account["id"],
            account_bank_code: account["account_bank_code"],
            account_number: account["account_number"],
            account_name: account["account_name"],
            is_default: account["is_default"],
            invoice_id: account["invoice_id"],
          })
        );
      }
    }

    const invoice: QPayInvoiceResponse = new QPayInvoiceResponse({
      id: data["id"],
      terminal_id: data["terminal_id"],
      amount: data["amount"],
      qr_code: data["qr_code"],
      description: data["description"],
      invoice_status: data["invoice_status"],
      invoice_status_date: data["invoice_status_date"],
      callback_url: data["callback_url"],
      customer_name: data["customer_name"],
      customer_logo: data["customer_logo"],
      currency: data["currency"],
      mcc_code: data["mcc_code"],
      legacy_id: data["legacy_id"],
      vendor_id: data["vendor_id"],
      process_code_id: data["process_code_id"],
      qr_image: data["qr_image"],
      invoice_bank_accounts: invoiceBankAccounts,
    });

    return invoice;
  }

  async getInvoice(invoiceId: string) {
    const response = await fetch(`${this._host}/v2/invoice/${invoiceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    const invoiceBankAccounts: QPayInvoiceBankAccount[] = [];

    if (Array.isArray(data?.invoice_bank_accounts)) {
      for (const account of data?.invoice_bank_accounts) {
        invoiceBankAccounts.push(
          new QPayInvoiceBankAccount({
            id: account["id"],
            account_bank_code: account["account_bank_code"],
            account_number: account["account_number"],
            account_name: account["account_name"],
            is_default: account["is_default"],
            invoice_id: account["invoice_id"],
          })
        );
      }
    }

    const invoice: QPayInvoiceResponse = new QPayInvoiceResponse({
      id: data["id"],
      terminal_id: data["terminal_id"],
      amount: data["amount"],
      qr_code: data["qr_code"],
      description: data["description"],
      invoice_status: data["invoice_status"],
      invoice_status_date: data["invoice_status_date"],
      callback_url: data["callback_url"],
      customer_name: data["customer_name"],
      customer_logo: data["customer_logo"],
      currency: data["currency"],
      mcc_code: data["mcc_code"],
      legacy_id: data["legacy_id"],
      vendor_id: data["vendor_id"],
      process_code_id: data["process_code_id"],
      qr_image: data["qr_image"],
      invoice_bank_accounts: invoiceBankAccounts,
    });

    return invoice;
  }

  async checkExpiration() {
    const expiresIn = new Date(this.expiresIn);
    expiresIn.setHours(expiresIn.getHours() - 1, 0, 0, 0);

    const refreshExpiresIn = new Date(this.refreshExpiresIn);
    refreshExpiresIn.setHours(refreshExpiresIn.getHours() - 1, 0, 0, 0);

    const now = new Date();

    if (now > expiresIn || now > refreshExpiresIn) {
      await this.refresh();
    }
  }
}
