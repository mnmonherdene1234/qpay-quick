import { QPayBankAccount } from './qpay-bank-account';

export type QPayInvoice = {
  merchant_id: string;
  amount: number;
  currency: string;
  customer_name: string;
  customer_logo: string;
  callback_url: string;
  description: string;
  mcc_code: string;
  bank_accounts: QPayBankAccount[];
};
