import {
  dateClickmmt,
  readFile,
  searchByDivmmt,
  writeFileAsync,
} from "../functions.js";
import {
  fetchDetails,
  formatDate,
  getDate,
  getInputAndFill,
  locateAndClick,
  scrollBottom,
  waitForRender,
} from "../functions.js";
export const mmtHandler = async ({ page, log }) => {
  log.info(`enqueueing new URLs`);
  await page.waitForTimeout(5000);
  await page.mouse.click(100, 200);

  const fd = await readFile("./INPUT.json");
  const parsedData = JSON.parse(fd);

  await waitForRender(
    page,
    "#top-banner > div.minContainer > div > div > div > div.fsw > div.fsw_inner.returnPersuasion > div.flt_fsw_inputBox.searchCity.inactiveWidget"
  );
  await locateAndClick(
    page,
    '//*[@id="top-banner"]/div[2]/div/div/div/div[2]/div[1]/div[1]'
  );

  //map input object
  await getInputAndFill(page, parsedData);
  await page.screenshot({ path: "screenshot1.png" });
  await page.waitForTimeout(1000);

  const searchText = await formatDate(parsedData);
  const day = await getDate(parsedData);
  await page.waitForTimeout(1000);

  while (
    !(await searchByDivmmt(
      page,
      searchText,
      '//*[@id="top-banner"]/div[2]/div/div/div/div[2]/div[1]/div[3]/div[1]/div/div/div/div[2]/div/div[2]/div[1]'
      // '//*[@id="top-banner"]/div[2]/div/div/div/div[2]/div[1]/div[3]/div[1]/div/div/div/div[2]/div/div[2]/div[1]'
    ))
  ) {
    await page
      .locator(
        '//*[@id="top-banner"]/div[2]/div/div/div/div[2]/div[1]/div[3]/div[1]/div/div/div/div[2]/div/div[1]/span[2]'
      )
      .click();
  }
  await page.screenshot({ path: "screenshot2.png" });

  await dateClickmmt(page, day, ".dateInnerCell");

  await locateAndClick(
    page,
    '//*[@id="top-banner"]/div[2]/div/div/div/div[2]/p/a'
  );
  await waitForRender(
    page,
    "#root > div > div:nth-child(2) > div.flightBody > div.overlay > div > div > div.makeFlex.hrtlCenter.right > button"
  );

  await locateAndClick(
    page,
    '//*[@id="root"]/div/div[2]/div[2]/div[2]/div/div/div[3]/button'
  );
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshot3.png" });
  
  await scrollBottom(page);
  await page.waitForTimeout(1000);

  // const details = await fetchDetails(page, parsedData);

  // const fc = {
  //   details: details,
  // };

  // const jsonData = JSON.stringify(fc, null, 2);

  // writeFileAsync("./mmtData.json", jsonData);

  const price = await page.$$eval(".clusterViewPrice", (els) => {
    return els.map((el) => el.textContent);
  });
  
  const name = await page.$$eval(".airlineName", (els) => {
    return els.map((el) => el.textContent);
  });
  

  // const aprice = await page.$$eval(".airlineName", (els) => {
    // return els.map((el) => el.textContent);
  // });
  
  console.log(name.length);
  console.log(name);
  console.log(price.length);
  console.log(price);


};
