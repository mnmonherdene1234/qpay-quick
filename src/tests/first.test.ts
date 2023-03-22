import QPayQuick from '../';

test('first', () => {
  expect(
    QPayQuick.setup({
      username: 'TEST_VENDOR_MERCHANT',
      password: '123456',
      terminalId: '95000059',
    }),
  ).toBeDefined();
});
