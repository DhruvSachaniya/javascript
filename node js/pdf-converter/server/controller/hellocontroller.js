import pool from "../config/dbconfig.js";

export function HelloWorld(req, res) {
  try {
    const query = `
      SELECT * FROM "Name"
    `;
    pool.query(query, (err, result) => {
      if (err) return console.log(err);
      res.status(200).json({ data: result.rows });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
