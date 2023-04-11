import QPayQuick, { QPayCheckPaymentResponse } from '..';

test('Check Payment', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });
  const result = await qpayQuick.checkPayment('e144f8e7-d001-48ce-8a52-f81556df77fb');

  expect(typeof result).toBe('object');
  expect(result).toBeDefined();
  expect((result as QPayCheckPaymentResponse).invoice_status).toBeDefined();
});
