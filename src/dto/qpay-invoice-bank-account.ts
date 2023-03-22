import { AccountBankCode } from './qpay-enumerations';

export default class QPayInvoiceBankAccount {
  id: string = '';
  account_bank_code: AccountBankCode = AccountBankCode.None;
  account_number: string = '';
  account_name: string = '';
  is_default: boolean = true;
  invoice_id: string = '';

  constructor({
    id = '',
    account_bank_code = AccountBankCode.None,
    account_number = '',
    account_name = '',
    is_default = true,
    invoice_id = '',
  }: {
    id?: string;
    account_bank_code?: AccountBankCode;
    account_number?: string;
    account_name?: string;
    is_default?: boolean;
    invoice_id?: string;
  }) {
    this.id = id;
    this.account_bank_code = account_bank_code;
    this.account_number = account_number;
    this.account_name = account_name;
    this.is_default = is_default;
    this.invoice_id = invoice_id;
  }
}
