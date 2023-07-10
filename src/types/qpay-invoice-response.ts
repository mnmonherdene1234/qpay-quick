import { QPayInvoiceBankAccount } from './qpay-invoice-bank-account';
import { QPayUrl } from './qpay-url';

export type QPayInvoiceResponse = {
  id: string;
  terminal_id: string;
  amount: string;
  qr_code: string;
  description: string;
  invoice_status: string;
  invoice_status_date: string;
  callback_url: string;
  customer_name: string;
  customer_logo: string;
  currency: string;
  mcc_code: string;
  legacy_id: string;
  vendor_id: string;
  process_code_id: string;
  qr_image: string;
  invoice_bank_accounts: QPayInvoiceBankAccount[];
  urls: QPayUrl[];
};
