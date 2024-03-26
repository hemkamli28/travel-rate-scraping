import {
  dateClickwego,
  formatDate,
  getDate,
  locateAndClick,
  readFile,
  scrollBottom,
  // searchByDiv,
  waitForRender,
} from "../functions.js";

export const wegoHandler = async ({ page, log }) => {
  log.info(`Handling request for wego.co.in`);
  // await page.waitForTimeout(4000);
  await waitForRender(
    page,
    "#app > div.H5kGuOuXyvuYLGjCbLSK > div.izA7kC_VrPlQUVlEMJ7t > div.Uuf7CrbcwgyV3_lR7sbS > div.PIQqbVneLCSeY6lry_NH > form > div.FTIAbMIXgywkyEyCngMv > div > button:nth-child(1)"
  );
  await page.getByRole("button", { name: "One-way" }).click();
  await locateAndClick(
    page,
    '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[1]/div[1]/div/div'
  );

  const fd = await readFile("./INPUT.json");
  const parsedData = JSON.parse(fd);

  await page.locator('//*[@id="outboundSearchQuery"]').fill(parsedData.source);
  await page.waitForTimeout(800);
  await page.keyboard.press("Enter");
  await page.locator('//*[@id="inboundSearchQuery"]').fill(parsedData.dest);
  await page.waitForTimeout(800);
  await page.keyboard.press("Enter");

  const searchText = await formatDate(parsedData);
  console.log("TObe:", searchText);
  const day = await getDate(parsedData);
  console.log("Dya:", day);

  console.log(
    await searchByDiv(
      page,
      searchText,
      '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/div/div[3]/div[1]'
    )
  );

  while (
    !(await searchByDiv(
      page,
      searchText,
      '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/div/div[3]/div[1]'
    ))
  ) {
    await page
      .locator(
        '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/div/div[2]'
      )
      .click();
  }
  await dateClickwego(page, day, ".nZBfJFGt62XKC2RYJfB6");
  await page.getByRole('button', {name: "Search"}).click();
  await page.waitForTimeout(1000);
  
  await waitForRender(page, '#app > div.niHz0SZLoWNvBkPpEpb6 > div.ENutvtNKzQNTSLJEPo3e > div.KtgGP9XOk54tZ78UCIJY > div.uZvAItb2D_mMOpvNo_ka > button.nvKcw_uGqCmuYXHEfxQJ > div')
  await page.waitForTimeout(4000);
  await scrollBottom(page);
  await page.waitForTimeout(2000);
  
  const airlineNames = await page.$$eval(".airlineName", (els) => {
    return els.map((el) => el.textContent);
  });
  await page.screenshot({ path: "final.png" });

};
