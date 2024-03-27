import {
  dateClickixigo,
  formatDate,
  getDate,
  locateAndClick,
  readFile,
  searchByDivixigo,
  waitForRender,
  writeFileAsync,
} from "../functions.js";

export const ixigoHandler = async ({ page }) => {
  const fd = await readFile("./INPUT.json");
  const parsedData = await JSON.parse(fd);
  // await waitForRender(page, '//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div');
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div"
  );
  await page
    .locator(
      "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div/div/div[2]/input"
    )
    .fill(parsedData.source);
  await page.waitForTimeout(1000);
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[3]/div[1]"
  );
  await page.waitForTimeout(1000);
  await page.mouse.click(100,100);
  await page.waitForTimeout(100);
  await locateAndClick(
    page,
    "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/div"
  );
  await page.waitForTimeout(400);

  await page
    .locator(
      "//html/body/main/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/div[2]/div/div/div[2]/input"
    )
    .fill(parsedData.dest);
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
  await page.waitForTimeout(2000);
  await page.reload();

  await page.waitForTimeout(19000);

  let allFlightDetails = [];

  for (let i = 0; i < 30; i++) {
    let previousHeight = 0;
    // Get the current height of the page
    // const currentHeight = await page.evaluate(() => document.body.scrollHeight);

    // Scroll down
    await page.mouse.wheel(0, 2000);

    // Wait for new content to load
    await page.waitForTimeout(2000); // Adjust timeout as needed

    // Extract flight details from the newly loaded content
    const flightDetails = await page.evaluate(() => {
      // Replace this selector with the appropriate selector for your webpage
      const flightElements = document.querySelectorAll(
        ".flex.items-start.w-full"
      );
      const details = [];

      flightElements.forEach((flightElement) => {
        // Extract flight details from the flight card element
        // Example:
        const airlineData = flightElement.querySelector(
          ".flex.gap-5.flex-col"
        ).innerText;
        const price = flightElement.querySelector(
          ".flex.items-baseline.gap-1"
        ).innerText;
        const reg = /\n/;
        // Add flight details to the list
        const airlineName = airlineData.split(reg);
      

        details.push({
          airline: airlineName[0],
          flightNo: airlineName[2],
          price: price.length > 10 ? price.split(reg)[2]: price,
        });
        // details.push({ airlineName,price });
      });

      return details;
    });

    allFlightDetails.push(...flightDetails);
  }
  // console.log(allFlightDetails)
  const removeDuplicates = (array) => {
    const uniqueObjects = [];
    const uniqueKeys = new Set();

    array.forEach((obj) => {
      const key = JSON.stringify(obj);
      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key);
        uniqueObjects.push(obj);
      }
    });

    return uniqueObjects;
  };

  const uniqueFlights = removeDuplicates(allFlightDetails);

  for (let i = 0; i < uniqueFlights.length; i++) {
    uniqueFlights[i]["source"] = parsedData.source;
    uniqueFlights[i]["dest"] = parsedData.dest;
  }

  console.log(uniqueFlights);
  console.log(uniqueFlights.length);

  const fc = {
    details: uniqueFlights,
  };

  console.log(uniqueFlights.length);
  const jsonData = JSON.stringify(fc, null, 2);
  writeFileAsync("./ixigoData.json", jsonData);

};
