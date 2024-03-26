import cors from "cors";
import express from "express";
import { runCrawler } from "./main.js";
import { createTableIfNotExists, insertDataSQL, readFile, writeFileAsync } from "./functions.js";
import { connectSql }from "./db.js";
const app = express();
const port = 5002;
app.use(express.json());
app.use(cors());
// await connectSql();
app.get("/", async (req, res) => {
  try {
    await runCrawler(); 
    res.send("Hello World!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/search", async (req, res) => {
  try {
    const { source, dest, date } = req.body;
    const obj = {
      source,
      dest,
      date,
    };

    const jsonString = JSON.stringify(obj);
    // console.log(jsonString);
    writeFileAsync("./INPUT.json", jsonString);

    await runCrawler(); 

    const fd = await readFile("./allDetails.json");
    const parsedData = await JSON.parse(fd);
    // await createTableIfNotExists()
    // await insertDataSQL(parsedData.details);
    return res.status(200).json(parsedData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
