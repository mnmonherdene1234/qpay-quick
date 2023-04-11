import { AccountBankCode } from './qpay-enumerations';

export type QPayInvoiceBankAccount = {
  id: string;
  account_bank_code: AccountBankCode;
  account_number: string;
  account_name: string;
  is_default: boolean;
  invoice_id: string;
};
