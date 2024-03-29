import { PlaywrightCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";
import { firefox } from 'playwright';
export const runCrawler = async () => {
  try {
    const startUrls = ["https://www.ixigo.com", "https://www.makemytrip.com"];
    // const startUrls = ["https://www.makemytrip.com"];
 
    const crawler = new PlaywrightCrawler({
      headless: false,
      requestHandler: router,
      maxRequestsPerCrawl: 1,
      requestHandlerTimeoutSecs: 120000,
      retryOnBlocked: true,
      launchContext:{
        launcher: firefox,
      },
    });
    const crawler2 = new PlaywrightCrawler({
      headless: false,
      requestHandler: router,
      maxRequestsPerCrawl: 1,
      requestHandlerTimeoutSecs: 120000,
      retryOnBlocked: true,
      
    });
    // for (const url of startUrls) {
    //   await crawler.run([url]); // Run the crawler for each URL sequentially
    //   console.log(`Finished scraping ${url}`);
    // }
    // for (const url of startUrls) {
    //   await crawler2.run([url]); // Run the crawler for each URL sequentially
    //   console.log(`Finished scraping ${url}`);
    // }
    // await crawler.run([startUrls[0]]);
    await crawler2.run([startUrls[1]]);
    // await crawler.run(startUrls);
    console.log("Running crawler success!");
  } catch (error) {
    console.log("Failed to run crawler!");
    console.log(error);
  }
};
