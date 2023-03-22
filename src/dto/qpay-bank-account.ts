import { AccountBankCode } from './qpay-enumerations';

export default class QPayBankAccount {
  default: boolean = true;
  account_bank_code: AccountBankCode = AccountBankCode.None;
  account_number: string = '';
  account_name: string = '';
  is_default: boolean = true;

  constructor({
    $default = true,
    account_bank_code = AccountBankCode.None,
    account_number = '',
    account_name = '',
    is_default = true,
  }: {
    $default?: boolean;
    account_bank_code?: AccountBankCode;
    account_number?: string;
    account_name?: string;
    is_default?: boolean;
  }) {
    this.default = $default;
    this.account_bank_code = account_bank_code;
    this.account_number = account_number;
    this.account_name = account_name;
    this.is_default = is_default;
  }
}
