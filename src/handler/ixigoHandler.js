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
  await page.waitForTimeout(2000);
  await page.reload()
    
  await page.waitForTimeout(19000);

  let allFlightDetails = [];
  
  for(let i = 0; i < 200; i++)
  {
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
          const flightElements = document.querySelectorAll('.flex.items-start.w-full'); 
          const details = [];

          flightElements.forEach(flightElement => {
              // Extract flight details from the flight card element
              // Example:
              const flightNumber = flightElement.querySelector('.flex.gap-5.flex-col').innerText;
              const price = flightElement.querySelector('.flex.items-baseline.gap-1').innerText;

              // Add flight details to the list
              details.push({ flightNumber, price });
          });

          return details;
      });

       allFlightDetails.push(...flightDetails);
    }
      console.log(allFlightDetails)


};
