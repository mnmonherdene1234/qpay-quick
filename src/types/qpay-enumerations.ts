export enum QPayEnvironment {
  Production = 'PRODUCTION',
  Development = 'DEVELOPMENT',
}

export enum MerchantType {
  Company = 'COMPANY',
  Person = 'PERSON',
}

export enum InvoiceStatus {
  Open = 'OPEN',
  Paid = 'PAID',
}

/**
 * Enum for bank
 * @readonly
 * @enum {string}
 */
export enum AccountBankCode {
  /**
   * @member {string}
   */
  /**
   * Default value
   */
  None = '',

  /**
   * @member {string}
   */
  /**
   * Мобифинанс
   */
  Mobifinance = '990000',

  /**
   * @member {string}
   */
  /**
   * Капитал банк
   */
  Capitalbank = '020000',

  /**
   * @member {string}
   */
  /**
   * Худалдаа хөгжлийн банк
   */
  TDB = '040000',

  /**
   * @member {string}
   */
  /**
   * Хаан банк
   */
  Khanbank = '050000',

  /**
   * @member {string}
   */
  /**
   * Голомт банк
   */
  Golomtbank = '150000',

  /**
   * @member {string}
   */
  /**
   * Тээвэр хөгжлийн банк
   */
  Transbank = '190000',

  /**
   * @member {string}
   */
  /**
   * Капитрон банк
   */
  Capitronbank = '300000',

  /**
   * @member {string}
   */
  /**
   * Хас банк
   */
  Xacbank = '320000',

  /**
   * @member {string}
   */
  /**
   * Төрийн банк
   */
  Statebank = '340000',

  /**
   * @member {string}
   */
  /**
   * Төрийн сан
   */
  Toriinsan = '900000',
}
