import { InvoiceStatus } from './qpay-enumerations';

export type QPayCheckPaymentResponse = {
  id: string;
  invoice_status: InvoiceStatus;
  invoice_status_date: string;
};
