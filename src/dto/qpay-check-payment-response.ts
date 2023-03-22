export enum InvoiceStatus {
  Open = 'OPEN',
  Close = 'CLOSE',
}

export default class QPayCheckPaymentResponse {
  id: string = '';
  invoice_status: InvoiceStatus = InvoiceStatus.Open;
  invoice_status_date: string = '';

  constructor({
    id = '',
    invoice_status = InvoiceStatus.Open,
    invoice_status_date = '',
  }: {
    id?: string;
    invoice_status?: InvoiceStatus;
    invoice_status_date?: string;
  }) {
    this.id = id;
    this.invoice_status = invoice_status;
    this.invoice_status_date = invoice_status_date;
  }
}
