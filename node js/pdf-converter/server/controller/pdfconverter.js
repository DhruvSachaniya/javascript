import PDFDocument from "pdfkit";
import fs from "fs";
import pool from "../config/dbconfig.js";

export function pdfConverter(req, res) {
  try {
    const { pdfname, name } = req.body;

    const query = `
      INSERT INTO FormData (FormId, pdfname, UserName) VALUES ($1, $2, $3)
    `;

    const doc = new PDFDocument();
    const filePath = `./pdfs/${pdfname}.pdf`;
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    doc.text("Form Data:", { fontsize: 14, bold: true });
    doc.text(`Name: ${name}`);

    doc.end();

    writeStream.on("finish", () => {
      pool.query(query, [1, pdfname, name], (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ message: "Error to enter data into db!" });
        }

        res.status(200).json({ message: "PDF is generated", filePath });
      });
    });

    writeStream.on("error", (err) => {
      console.error("Error writing PDF:", err);
      res.status(500).json({ message: "Error generating PDF" });
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
