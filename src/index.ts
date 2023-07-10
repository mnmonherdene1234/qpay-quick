import axios from 'axios';
import {
  QPayCheckPaymentResponse,
  QPayCompanyMerchant,
  QPayCompanyMerchantResponse,
  QPayInvoice,
  QPayInvoiceResponse,
  QPayMerchantsList,
  QPayPersonMerchant,
  QPayPersonMerchantResponse,
  QPayTokenResponse,
} from './types';
import { QPayEnvironment } from './types/qpay-enumerations';
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

  private constructor() {}

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
      setInterval(QPayQuick.instance.checkExpiration, 1000 * 60);
    }

    QPayQuick.instance.username = username;
    QPayQuick.instance.password = password;
    QPayQuick.instance.terminalId = terminalId;

    if (env === QPayEnvironment.Production) {
      QPayQuick.instance.host = 'https://quickqr.qpay.mn';
    } else {
      QPayQuick.instance.host = 'https://sandbox-quickqr.qpay.mn';
    }

    await QPayQuick.instance.token();

    return QPayQuick.instance;
  }

  public static async getInstance(): Promise<QPayQuick> {
    if (!QPayQuick.instance) {
      throw new Error('INSTANCE_NOT_FOUND');
    }

    return QPayQuick.instance;
  }

  async token() {
    const response = await axios.post<QPayTokenResponse>(
      `${this.host}/v2/auth/token`,
      {
        terminal_id: this.terminalId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`,
        },
      },
    );

    if (response.status === 200) {
      const data = response.data;

      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.expiresIn = new Date(data.expires_in * 1000);
      this.refreshExpiresIn = new Date(data.refresh_expires_in * 1000);
    } else {
      throw new Error('TOKEN_ERROR');
    }
  }

  async refresh() {
    const response = await axios.post<QPayTokenResponse>(`${this.host}/v2/auth/refresh`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.refreshToken}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;

      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.expiresIn = new Date(data.expires_in * 1000);
      this.refreshExpiresIn = new Date(data.refresh_expires_in * 1000);
    } else {
      throw new Error('REFRESH_ERROR');
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

  async createInvoice(qpayInvoice: QPayInvoice) {
    return axios.post<QPayInvoiceResponse>(`${this.host}/v2/invoice`, qpayInvoice, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async getInvoice(invoiceId: string) {
    return axios.get<Omit<QPayInvoiceResponse, 'urls'>>(`${this.host}/v2/invoice/${invoiceId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async createComapanyMerchant(company: QPayCompanyMerchant) {
    return axios.post<QPayCompanyMerchantResponse>(`${this.host}/v2/merchant/company`, company, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async createPersonMerchant(person: QPayPersonMerchant) {
    return axios.post<QPayPersonMerchantResponse>(`${this.host}/v2/merchant/person`, person, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async getMerchantsList(query: { offset: { page_number: number; page_limit: number } }) {
    return axios.post<QPayMerchantsList>(`${this.host}/v2/merchant/list`, query, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async checkPayment(invoiceId: string) {
    return axios.post<QPayCheckPaymentResponse>(
      `${this.host}/v2/payment/check`,
      { invoice_id: invoiceId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );
  }
}

export * from './types';
