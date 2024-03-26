import {
  dateClickixigo,
  formatDate,
  getDate,
  locateAndClick,
  readFile,
  searchByDivixigo,
  waitForRender,
} from "../functions.js";

export const ixigoHandler = async ({ page}) => {

  // await waitForRender(page, '//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div');
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div"
  );
  await page
    .locator(
      "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div/div/div[2]/input"
    )
    .fill("DEL");
  await page.waitForTimeout(1000);
  await page.mouse.move(100, 100);
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]"
  );
  await page.waitForTimeout(1000);

  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/div"
  );
  await page
    .locator(
      "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div/div/div[2]/input"
    )
    .fill("BLR");
  await page.waitForTimeout(1000);
  await page.mouse.move(100, 100);
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[3]/div[1]"
  );

  await page.waitForTimeout(1000);
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[2]/div[1]"
  );
  await page.mouse.move(10, 90);
  await page.mouse.move(0, 100);
  const fd = await readFile("./INPUT.json");
  const parsedData = await JSON.parse(fd);
  await page.waitForTimeout(1000);

  const searchText = await formatDate(parsedData);
  const day = await getDate(parsedData);
  await page.waitForTimeout(1000);
  while (
    !(await searchByDivixigo(
      page,
      searchText,
      "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[2]/div[3]/div/div[1]/div[1]/button[2]"
    ))
  ) {
    await page
      .locator(
        "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[2]/div[3]/div/div[1]/div[1]/button[3]"
      )
      .click();
  }
  await page.waitForTimeout(2000);
  await page.mouse.move(0, 100);
  await dateClickixigo(page, day, ".react-calendar__tile");
  await page.waitForTimeout(2000);

  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/button"
  );

  // await page.waitForSelector('//html/body/div[3]/div[3]/div/div[2]/div[3]/div[2]/div/div[1]/div[1]/div[1]/div/p[1]', {timeout : 14000});

  // await page.waitForLoadState('domcontentloaded');
  // await page.waitForLoadState('networkidle');
  await page.waitForTimeout(10000);
  
    

  
  const airlineNames = await page.$$eval(".airlineTruncate", (els) => {
    return els.map((el) => el.textContent);
  });

  console.log(airlineNames);
  await page.screenshot({ path: "xyz.png" });
};
