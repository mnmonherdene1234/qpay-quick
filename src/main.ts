import QPayQuick from "./qpay-quick/qpay-quick";

async function main() {
  console.log("MAIN Started");
  const qpayQuick: QPayQuick = await QPayQuick.getInstanceAsync();

  console.log(qpayQuick);
}

main();
