import QPayBankAccount from "./qpay-bank-account";
import QPayLine from "./qpay-line";

export default class QPayInvoice {
  merchant_id: string = "";
  amount: number = 0;
  lines: QPayLine[] = [];
  currency: string = "";
  customer_name: string = "";
  customer_logo: string = "";
  callback_url: string = "";
  description: string = "";
  mcc_code: string = "";
  back_accounts: QPayBankAccount[] = [];

  constructor({
    merchant_id = "",
    amount = 0,
    lines = [],
    currency = "",
    customer_name = "",
    customer_logo = "",
    callback_url = "",
    description = "",
    mcc_code = "",
    back_accounts = [],
  }: {
    merchant_id: string;
    amount: number;
    lines: QPayLine[];
    currency: string;
    customer_name: string;
    customer_logo: string;
    callback_url: string;
    description: string;
    mcc_code: string;
    back_accounts: QPayBankAccount[];
  }) {
    this.merchant_id = merchant_id;
    this.amount = amount;
    this.lines = lines;
    this.currency = currency;
    this.customer_name = customer_name;
    this.customer_logo = customer_logo;
    this.callback_url = callback_url;
    this.description = description;
    this.mcc_code = mcc_code;
    this.back_accounts = back_accounts;
  }
}
