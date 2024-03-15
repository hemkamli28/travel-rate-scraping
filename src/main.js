import { PlaywrightCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";

export const runCrawler = async () => {
  try {
    const startUrls = ["https://www.makemytrip.com", "https://www.wego.co.in"];
    const crawler = new PlaywrightCrawler({
      headless: false,
      requestHandler: router,
      maxRequestsPerCrawl: 20,
    });
    await crawler.run(startUrls);
    console.log("Running crawler success!")
  } catch (error) {
      console.log("Failed to run crawler!")
      console.log(error)
  }
};
