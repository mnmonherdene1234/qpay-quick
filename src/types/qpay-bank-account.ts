import { AccountBankCode } from './qpay-enumerations';

export type QPayBankAccount = {
  default: boolean;
  account_bank_code: AccountBankCode;
  account_number: string;
  account_name: string;
  is_default: boolean;
};
