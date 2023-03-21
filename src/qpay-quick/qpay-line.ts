import QPayDiscount from "./qpay-discount";

export default class QPayLine {
  sender_product_code: string = "";
  tax_product_code: string = "";
  line_description: string = "";
  line_quantity: number = 0;
  line_unit_price: number = 0;
  note: string = "";
  discounts: QPayDiscount[] = [];

  constructor({
    sender_product_code = "",
    tax_product_code = "",
    line_description = "",
    line_quantity = 0,
    line_unit_price = 0,
    note = "",
    discounts = [],
  }: {
    sender_product_code: string;
    tax_product_code: string;
    line_description: string;
    line_quantity: number;
    line_unit_price: number;
    note: string;
    discounts: QPayDiscount[];
  }) {
    this.sender_product_code = sender_product_code;
    this.tax_product_code = tax_product_code;
    this.line_description = line_description;
    this.line_quantity = line_quantity;
    this.line_unit_price = line_unit_price;
    this.note = note;
    this.discounts = discounts;
  }
}
