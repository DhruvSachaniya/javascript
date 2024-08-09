import pool from "../config/dbconfig.js";

async function GetAllPdfData(req, res) {
  try {
    const query = `SELECT * FROM FormData`;

    pool.query(query, (err, result) => {
      if (err) {
        res.status(400).json({ message: "Error to get All Pdf data" });
      }
      if (result) {
        res.status(200).json({ data: result.rows });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default { GetAllPdfData };
