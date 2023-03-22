import QPayBankAccount from "./qpay-bank-account";

export default class QPayInvoice {
  merchant_id: string = "";
  amount?: number = 0;
  currency: string = "";
  customer_name: string = "";
  customer_logo: string = "";
  callback_url: string = "";
  description: string = "";
  mcc_code: string = "";
  bank_accounts: QPayBankAccount[] = [];

  constructor({
    merchant_id = "",
    amount = 0,
    currency = "MNT",
    customer_name = "",
    customer_logo = "",
    callback_url = "",
    description = "",
    mcc_code = "",
    bank_accounts = [],
  }: {
    merchant_id?: string;
    amount?: number;
    currency?: string;
    customer_name?: string;
    customer_logo?: string;
    callback_url?: string;
    description?: string;
    mcc_code?: string;
    bank_accounts?: QPayBankAccount[];
  }) {
    this.merchant_id = merchant_id;
    this.amount = amount;
    this.currency = currency;
    this.customer_name = customer_name;
    this.customer_logo = customer_logo;
    this.callback_url = callback_url;
    this.description = description;
    this.mcc_code = mcc_code;
    this.bank_accounts = bank_accounts;
  }
}
