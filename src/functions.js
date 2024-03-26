import fs from "fs";
import { connectSql } from "./db.js";

export const writeFileAsync = async (path, jsonString) => {
  try {
    await fs.promises.writeFile(path, jsonString);
    console.log("Successfully wrote file");
  } catch (err) {
    console.error("Error writing file", err);
  }
};

export const readFile = async (filePath) => {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the file:", err);
          reject(err); // Reject the promise if there's an error
          return;
        }
        resolve(data); // Resolve the promise with the file data
      });
    });
  } catch (err) {
    throw err; // Rethrow the error to propagate it further
  }
};
export const locateAndClick = async (page, xpath) => {
  try {
    console.log("locating and clicking....");
    await page.locator(xpath).click();
    console.log("clicked!");
  } catch (error) {
    console.log("Failed to click.!");
    console.log(error);
  }
};

export const waitForRender = async (page, selector) => {
  try {
    console.log("waiting for selector....");
    await page.waitForSelector(selector);
    console.log("selector loaded!");
  } catch (error) {
    console.log("Failed to click.!");
    console.log(error);
  }
};

export const getInputAndFill = async (page, parsedData) => {
  try {
    console.log("Entering From & To...");
    console.log(parsedData);
    await page.getByPlaceholder("From").fill(parsedData.source);
    await page.waitForTimeout(1000);

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Tab");

    await page.getByPlaceholder("To").fill(parsedData.dest);
    await page.waitForTimeout(1000);

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Tab");

    console.log("Entered From & To!");
  } catch (error) {
    console.log(error);
    console.log("Failed to click.!");
  }
};

export const scrollBottom = async (page) => {
  try {
    console.log("scrolling down...");
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("End");
    }
  } catch (error) {
    console.log(error);
    console.log("Failed to scroll!");
  }
};

export const fetchDetails = async (page, parsedData) => {
  try {
    const airlineNames = await page.$$eval(".airlineName", (els) => {
      return els.map((el) => el.textContent);
    });

    const price = await page.$$eval(".clusterViewPrice", (els) => {
      return els.map((el) => el.textContent);
    });

    const flightCode = await page.$$eval(".fliCode", (els) => {
      return els.map((el) => el.textContent);
    });
    console.log(price, airlineNames, flightCode);

    let details = [];
    let detail = {
      source: "",
      dest: "",
      flightNo: "",
      airline: "",
      price: "",
    };

    for (let i = 0; i < airlineNames.length; i++) {
      detail = {
        source: parsedData.source,
        dest: parsedData.dest,
        flightNo: flightCode[i],
        airline: airlineNames[i],
        price: price[i]?.slice(0, -9),
      };

      details.push(detail);
    }

    console.log("d", details);
    return details;
  } catch (error) {
    console.log("failed to fetch!");
  }
};

export const formatDate = async (parsedData) => {
  try {
    const date = parsedData.date;
    const monthNumber = date.slice(5, 7);
    const year = date.slice(0, 4);
    let monthName;
    switch (monthNumber) {
      case "01":
        monthName = "January ";
        break;
      case "02":
        monthName = "February ";
        break;
      case "03":
        monthName = "March ";
        break;
      case "04":
        monthName = "April ";
        break;
      case "05":
        monthName = "May ";
        break;
      case "06":
        monthName = "June ";
        break;
      case "07":
        monthName = "July ";
        break;
      case "08":
        monthName = "August ";
        break;
      case "09":
        monthName = "September ";
        break;
      case "10":
        monthName = "October ";
        break;
      case "11":
        monthName = "November ";
        break;
      case "12":
        monthName = "December ";
        break;
      default:
        monthName = "Invalid month number";
    }
    const obj = monthName.concat(year);
    console.log("fubobj:", obj);
    return obj;
  } catch (error) {
    console.log(error);
    console.log("Failed to format date!");
  }
};

export const searchByDivmmt = async (page, searchText, parentDivSelector) => {
  try {
    const divWithText = await page.$eval(
      parentDivSelector,
      (parentDiv, searchText) => {

        const divs = parentDiv.querySelectorAll("div");
        for (const div of divs) {
          if (div.textContent.includes(searchText)) {
            return div.outerHTML;
          }
        }
        return null;
      },
      searchText,
    );

    if (divWithText) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};


export const searchByDivixigo = async (page, searchText, parentDivSelector) => {
  try {
    const divWithText = await page.$eval(
      parentDivSelector,
      (parentDiv, searchText) => {

        const divs = parentDiv.querySelectorAll("span:first-child");
        for (const div of divs) {
          if (div.textContent.includes(searchText)) {
            return div.outerHTML;
          }
        }
        return null;
      },
      searchText,
    );

    if (divWithText) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDate = async (parsedData) => {
  try {
    const parts = parsedData.date.split("-");
    console.log(parts);

    parts[2] = parseInt(parts[2], 10).toString();
    console.log(parts[2]);
    // var date = parts.join("-");
    return parts[2];
  } catch (error) {
    console.log(error);
  }
};
export const dateClickixigo = async (page, day, classdiv) => {
  try {
    const divsWithText = await page.$$(classdiv);

    for (const divWithText of divsWithText) {
      const innerText = await divWithText.$eval(
        "abbr:first-child",
        (element) => element.textContent
      );
      if (innerText === day) {
        await divWithText.click();
        console.log("Clicked on the div with text:", day);
        break;
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const dateClickmmt = async (page, day, classdiv) => {
  try {
    const divsWithText = await page.$$(classdiv);

    for (const divWithText of divsWithText) {
      const innerText = await divWithText.$eval(
        "p:first-child",
        (element) => element.textContent
      );
      if (innerText === day) {
        await divWithText.click();
        console.log("Clicked on the div with text:", day);
        break;
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const dateClickwego = async (page, day, classdiv) => {
  try {
    const divs = await page.$$(classdiv);

    for (const div of divs) {
      const innerText = await div.evaluate((element) => element.textContent);
      if (innerText.trim() === day) {
        await div.click();
        console.log("Clicked on the div with text:", day);
        return true;
      }
    }
    console.log("No div with text:", day);
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const insertDataSQL = async (data) => {
  try {
    const connection = await connectSql();

    for (const item of data) {
      const { source, dest, flightNo, airline, price } = item;
      const sql = `INSERT INTO mmt (source, dest, flightNo, airline, price) VALUES (?, ?, ?, ? , ?)`; 
      const values = [source, dest, flightNo, airline, price]; 

      await connection.promise().execute(sql, values);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createTableIfNotExists = async () => {
  const connection = await connectSql();
  try {
    const [rows, fields] = await connection
      .promise()
      .query("SHOW TABLES LIKE 'mmt'");

    if (rows.length === 0) {
      await connection.promise().query(`
        CREATE TABLE mmt (
          id INT AUTO_INCREMENT PRIMARY KEY,
          source VARCHAR(255),
          dest VARCHAR(255),
          flightNo VARCHAR(255),
          airline VARCHAR(255),
          price VARCHAR(10)
        )
      `);

      console.log("Table created successfully");
    } else {
      console.log("Table already exists");
    }
  } catch (error) {
    console.error("Error creating table:", error);
  }
};
