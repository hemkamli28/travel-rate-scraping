import { Dataset, createPlaywrightRouter } from "crawlee";

import { mmtHandler } from "./handler/mmtHandler.js";
import { wegoHandler } from "./handler/wegoHandler.js";
export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ page, log }) => {
  const url = page.url();
  switch (true) {
    case url.startsWith("https://www.makemytrip.com"):
      log.info(`Handling request for MMT `);
      await mmtHandler({ page, log });
      break;
    case url.startsWith("https://www.wego.co.in"):
      log.info(`Handling request for  WEGO`);
      await wegoHandler({ page, log });
      break;
    default:
      log.info(`Handling request for other URLs`);
      break;
  }
});
