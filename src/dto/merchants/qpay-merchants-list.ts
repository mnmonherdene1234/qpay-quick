import QPayMerchantListRow from './qpay-merchant-list-row';

export default class QPayMerchantsList {
  count: number = 0;
  rows: QPayMerchantListRow[] = [];

  constructor({ count = 0, rows = [] }: { count?: number; rows?: QPayMerchantListRow[] }) {
    Object.assign(this, {
      count,
      rows,
    });
  }
}
