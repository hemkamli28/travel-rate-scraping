import { PlaywrightCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";

export const runCrawler = async () => {
  try {
    // const startUrls = ["https://www.makemytrip.com", "https://www.wego.co.in"];

    const startUrls = ["https://www.ixigo.com"];
    // const startUrls = ["https://www.makemytrip.com"];
    const crawler = new PlaywrightCrawler({
     headless: false,
      requestHandler: router,
      maxRequestsPerCrawl: 20,
      requestHandlerTimeoutSecs: 120000,
    }
    // ,userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );
    await crawler.run(startUrls);
    console.log("Running crawler success!");
  } catch (error) {
    console.log("Failed to run crawler!");
    console.log(error);
  }
};
