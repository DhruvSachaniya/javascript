import pool from "../config/dbconfig.js";

async function TestFunction(req, res) {
  try {
    res.status(200).json({ message: "this is from test!" });
  } catch (err) {
    console.log(err);
  }
}

async function SetupDatabase(req, res) {
  try {
    const query = `
      CREATE TABLE FormData (
        FormId int NOT NULL,
        pdfname varchar(45),
        UserName varchar(20)
      );
    `;

    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "error to create table" });
      }
      if (result) {
        return res.status(200).json({ message: "the table has been created" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default { TestFunction, SetupDatabase };