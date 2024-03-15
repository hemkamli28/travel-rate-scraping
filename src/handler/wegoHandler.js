import {
  dateClick,
  extractAndCompare,
  formatDate,
  getDate,
  locateAndClick,
  readFile,
  searchByDiv,
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

  await page.waitForTimeout(1000);
   const check = await extractAndCompare(page,searchText, '#app > div.H5kGuOuXyvuYLGjCbLSK > div.izA7kC_VrPlQUVlEMJ7t > div.Uuf7CrbcwgyV3_lR7sbS > div.PIQqbVneLCSeY6lry_NH > form > div.IDWPiyXj0_lhCFWfRIht > div > div.Q3HUl_CvDCUwaNlkVyXM > div > div.J1uxu56cx9X6njTxfiph.fZNVU9Y2qimaaBj5LB_T > div > div.JQ0rFqdgicl3mY6DmQ_G > div:nth-child(1) > div.Mb0fqfkJKrlrncFaK_py')
    console.log("y1!", check)
  // const find =  await searchByDiv(page,searchText,'//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/div/div[3]')
  // console.log("d:",find)
  // while (
  //   !(await searchByDiv(
  //     page,
  //     searchText,
  //     '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/div/div[3]/div[1]/div[1]'
  //   )
  // ) ){
  //   await page
  //     .locator(
  //       '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div/div[2]/div/div[2]'
  //     )
  //     .click();
  // }
  // await dateClick(page,day,'.nZBfJFGt62XKC2RYJfB6');
};
