export default class QPayDiscount {
  discount_code: string = "";
  description: string = "";
  amount: number = 0;
  note: string = "";

  constructor({
    discount_code = "",
    description = "",
    amount = 0,
    note = "",
  }: {
    discount_code: string;
    description: string;
    amount: number;
    note: string;
  }) {
    this.discount_code = discount_code;
    this.description = description;
    this.amount = amount;
    this.note = note;
  }
}
