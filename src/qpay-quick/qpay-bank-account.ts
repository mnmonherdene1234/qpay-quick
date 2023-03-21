export default class QPayBankAccount {
  default: boolean = true;
  account_back_code: string = "";
  account_number: string = "";
  account_name: string = "";
  is_default: boolean = true;

  constructor({
    $default = true,
    account_back_code = "",
    account_number = "",
    account_name = "",
    is_default = true,
  }: {
    $default?: boolean;
    account_back_code?: string;
    account_number?: string;
    account_name?: string;
    is_default?: boolean;
  }) {
    this.default = $default;
    this.account_back_code = account_back_code;
    this.account_number = account_number;
    this.account_name = account_name;
    this.is_default = is_default;
  }
}
