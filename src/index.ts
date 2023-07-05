import axios from 'axios';
import {
  QPayCheckPaymentResponse,
  QPayCompanyMerchant,
  QPayCompanyMerchantResponse,
  QPayInvoice,
  QPayInvoiceBankAccount,
  QPayInvoiceResponse,
  QPayMerchantListRow,
  QPayMerchantsList,
  QPayPersonMerchant,
  QPayPersonMerchantResponse,
  QPayTokenResponse,
} from './types';
import { AccountBankCode, InvoiceStatus, MerchantType, QPayEnvironment } from './types/qpay-enumerations';
export default class QPayQuick {
  private static instance: QPayQuick;

  private username: string = '';
  private password: string = '';
  private terminalId: string = '';
  private accessToken: string = '';
  private expiresIn: Date = new Date();
  private refreshExpiresIn: Date = new Date();
  private refreshToken: string = '';
  private host: string = '';

  private constructor() { }

  public static async setup({
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
        QPayQuick.instance.host = 'https://quickqr.qpay.mn';
      } else {
        QPayQuick.instance.host = 'https://sandbox-quickqr.qpay.mn';
      }

      await QPayQuick.instance.token();
    }

    return QPayQuick.instance;
  }

  public static async getInstance(): Promise<QPayQuick> {
    if (!QPayQuick.instance) {
      QPayQuick.instance = new QPayQuick();
      setInterval(QPayQuick.instance.checkExpiration, 1000 * 60);
    }

    await QPayQuick.instance.token();

    return QPayQuick.instance;
  }

  async token() {
    try {
      const response = await axios.post(`${this.host}/v2/auth/token`, {
        terminal_id: this.terminalId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        const tokenResponse: QPayTokenResponse = {
          token_type: data?.token_type,
          refresh_expires_in: data?.refresh_expires_in,
          refresh_token: data?.refresh_token,
          access_token: data?.access_token,
          expires_in: data?.expires_in,
          scope: data?.scope,
          session_state: data?.session_state,
        };

        this.accessToken = tokenResponse.access_token;
        this.refreshToken = tokenResponse.refresh_token;
        this.expiresIn = new Date(tokenResponse.expires_in * 1000);
        this.refreshExpiresIn = new Date(tokenResponse.refresh_expires_in * 1000);
      } else {
        throw new Error(JSON.stringify(response.data));
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async refresh() {
    try {
      const response = await axios.post(`${this.host}/v2/auth/refresh`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        const tokenResponse: QPayTokenResponse = {
          token_type: data?.token_type,
          refresh_expires_in: data?.refresh_expires_in,
          refresh_token: data?.refresh_token,
          access_token: data?.access_token,
          expires_in: data?.expires_in,
          scope: data?.scope,
          session_state: data?.session_state,
        };

        this.accessToken = tokenResponse.access_token;
        this.refreshToken = tokenResponse.refresh_token;
        this.expiresIn = new Date(tokenResponse.expires_in * 1000);
        this.refreshExpiresIn = new Date(tokenResponse.refresh_expires_in * 1000);
      } else {
        throw new Error(JSON.stringify(response.data));
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async checkExpiration() {
    const expiresIn = new Date(this.expiresIn);
    expiresIn.setHours(expiresIn.getHours() - 1, 0, 0, 0);

    const refreshExpiresIn = new Date(this.refreshExpiresIn);
    refreshExpiresIn.setHours(refreshExpiresIn.getHours() - 1, 0, 0, 0);

    const now = new Date();

    if (now > expiresIn || now > refreshExpiresIn) {
      await this.refresh();
    }
  }

  async createInvoice(qpayInvoice: QPayInvoice): Promise<QPayInvoiceResponse> {
    try {
      const response = await axios.post<QPayInvoiceResponse>(`${this.host}/v2/invoice`, qpayInvoice, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(JSON.stringify(response.data));
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getInvoice(invoiceId: string) {
    const response = await fetch(`${this.host}/v2/invoice/${invoiceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
        invoiceBankAccounts.push({
          id: account?.id,
          account_bank_code: account?.account_bank_code as AccountBankCode,
          account_number: account?.account_number,
          account_name: account?.account_name,
          is_default: account?.is_default,
          invoice_id: account?.invoice_id,
        });
      }
    }

    const invoice: QPayInvoiceResponse = {
      id: data?.id,
      terminal_id: data?.terminal_id,
      amount: data?.amount,
      qr_code: data?.qr_code,
      description: data?.description,
      invoice_status: data?.invoice_status,
      invoice_status_date: data?.invoice_status_date,
      callback_url: data?.callback_url,
      customer_name: data?.customer_name,
      customer_logo: data?.customer_logo,
      currency: data?.currency,
      mcc_code: data?.mcc_code,
      legacy_id: data?.legacy_id,
      vendor_id: data?.vendor_id,
      process_code_id: data?.process_code_id,
      qr_image: data?.qr_image,
      invoice_bank_accounts: invoiceBankAccounts,
    };

    return invoice;
  }

  async createComapanyMerchant(company: QPayCompanyMerchant): Promise<QPayCompanyMerchantResponse> {
    const response = await fetch(`${this.host}/v2/merchant/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(company),
    });

    const data = await response.json();

    if (response.ok) {
      const result: QPayCompanyMerchantResponse = {
        id: data?.id,
        vendor_id: data?.vendor_id,
        type: data?.type as MerchantType,
        register_number: data?.register_number,
        name: data?.name,
        owner_register_no: data?.owner_register_no,
        owner_first_name: data?.owner_first_name,
        owner_last_name: data?.owner_last_name,
        mcc_code: data?.mcc_code,
        city: data?.city,
        district: data?.district,
        address: data?.address,
        phone: data?.phone,
        email: data?.email,
        location_lat: data?.location_lat,
        location_lng: data?.location_lng,
      };

      return result;
    } else {
      throw new Error(JSON.stringify(data));
    }
  }

  async createPersonMerchant(person: QPayPersonMerchant): Promise<QPayPersonMerchantResponse> {
    const response = await fetch(`${this.host}/v2/merchant/person`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(person),
    });

    const data = await response.json();

    if (response.ok) {
      const result: QPayPersonMerchantResponse = {
        id: data?.id,
        vendor_id: data?.vendor_id,
        type: data?.type as MerchantType,
        first_name: data?.first_name,
        last_name: data?.last_name,
        register_number: data?.register_number,
        mcc_code: data?.mcc_code,
        city: data?.city,
        district: data?.district,
        address: data?.address,
        phone: data?.phone,
        email: data?.email,
      };

      return result;
    } else {
      throw new Error(JSON.stringify(data));
    }
  }

  async getMerchantsList(query: { offset: { page_number: number; page_limit: number } }): Promise<QPayMerchantsList> {
    const response = await fetch(`${this.host}/v2/merchant/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(query),
    });

    const data = await response.json();

    if (response.ok) {
      const rows: QPayMerchantListRow[] = Array.isArray(data?.rows)
        ? data?.rows?.map((row: any) => ({
          id: row?.id,
          type: row?.type as MerchantType,
          register_number: row?.register_number,
          name: row?.name,
          first_name: row?.first_name,
          last_name: row?.last_name,
          mcc_code: row?.mcc_code,
          city: row?.city,
          district: row?.district,
          address: row?.address,
          phone: row?.phone,
          email: row?.email,
          created_date: row?.created_date,
        }))
        : [];

      const result: QPayMerchantsList = {
        count: data?.count,
        rows,
      };

      return result;
    } else {
      throw new Error(JSON.stringify(data));
    }
  }

  async checkPayment(invoiceId: string) {
    const response = await fetch(`${this.host}/v2/payment/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify({ invoice_id: invoiceId }),
    });

    const data = await response.json();

    if (response.ok) {
      const checkPaymentResponse: QPayCheckPaymentResponse = {
        id: data?.id,
        invoice_status: (data?.invoice_status as InvoiceStatus) || InvoiceStatus.Open,
        invoice_status_date: data?.invoice_status_date,
      };

      return checkPaymentResponse;
    } else {
      throw new Error(JSON.stringify(data));
    }
  }
}

export * from './types';
