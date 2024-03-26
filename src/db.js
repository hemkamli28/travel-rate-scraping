import mysql from "mysql2";

export const connectSql = async () => {
  try {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Oneclick1@",
      database: "scrap",
    });

    return new Promise((resolve, reject) => {
      con.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL database:", err);
          reject(err); 
          return;
        }
        console.log("Connected to MySQL database!");
        resolve(con); 
      });
    });
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};
