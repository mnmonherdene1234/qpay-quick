import QPayQuick from "./qpay-quick";

async function main() {
  console.log("MAIN Started");
  const qpayQuick: QPayQuick = QPayQuick.getInstance();

  console.log(qpayQuick.host);

  setTimeout(() => {
    qpayQuick.refresh();
  }, 3000);
}

main();
