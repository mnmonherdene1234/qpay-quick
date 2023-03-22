import QPayInvoiceBankAccount from './qpay-invoice-bank-account';

export default class QPayInvoiceResponse {
  id: string = '';
  terminal_id: string = '';
  amount: string = '';
  qr_code: string = '';
  description: string = '';
  invoice_status: string = '';
  invoice_status_date: string = '';
  callback_url: string = '';
  customer_name: string = '';
  customer_logo: string = '';
  currency: string = '';
  mcc_code: string = '';
  legacy_id: string = '';
  vendor_id: string = '';
  process_code_id: string = '';
  qr_image: string = '';
  invoice_bank_accounts: QPayInvoiceBankAccount[] = [];

  constructor({
    id = '',
    terminal_id = '',
    amount = '',
    qr_code = '',
    description = '',
    invoice_status = '',
    invoice_status_date = '',
    callback_url = '',
    customer_name = '',
    customer_logo = '',
    currency = '',
    mcc_code = '',
    legacy_id = '',
    vendor_id = '',
    process_code_id = '',
    qr_image = '',
    invoice_bank_accounts = [],
  }: {
    id?: string;
    terminal_id?: string;
    amount?: string;
    qr_code?: string;
    description?: string;
    invoice_status?: string;
    invoice_status_date?: string;
    callback_url?: string;
    customer_name?: string;
    customer_logo?: string;
    currency?: string;
    mcc_code?: string;
    legacy_id?: string;
    vendor_id?: string;
    process_code_id?: string;
    qr_image?: string;
    invoice_bank_accounts?: QPayInvoiceBankAccount[];
  }) {
    this.id = id;
    this.terminal_id = terminal_id;
    this.amount = amount;
    this.qr_code = qr_code;
    this.description = description;
    this.invoice_status = invoice_status;
    this.invoice_status_date = invoice_status_date;
    this.callback_url = callback_url;
    this.customer_name = customer_name;
    this.customer_logo = customer_logo;
    this.currency = currency;
    this.mcc_code = mcc_code;
    this.legacy_id = legacy_id;
    this.vendor_id = vendor_id;
    this.process_code_id = process_code_id;
    this.qr_image = qr_image;
    this.invoice_bank_accounts = invoice_bank_accounts;
  }
}
