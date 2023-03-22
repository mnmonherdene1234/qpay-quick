import QPayQuick from '..';
import { AccountBankCode } from '../dto/qpay-enumerations';

test('setup', async () => {
  expect(
    await QPayQuick.setup({
      username: 'TEST_VENDOR_MERCHANT',
      password: '123456',
      terminalId: '95000059',
    }),
  ).toBeInstanceOf(QPayQuick);
});

test('getInstance', async () => {
  expect(await QPayQuick.getInstance()).toBeInstanceOf(QPayQuick);
});
