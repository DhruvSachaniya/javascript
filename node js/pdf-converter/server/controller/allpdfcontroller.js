import pool from "../config/dbconfig.js";
import moment from "moment-timezone";

async function GetAllPdfData(req, res) {
  try {
    const query = `SELECT * FROM otp WHERE otp = $1`;

    pool.query(query, [142044], (err, result) => {
      if (err) {
        res.status(400).json({ message: "Error to get All Pdf data" });
      }
      if (result) {
        if (result.rows.length > 0) {
          const currentTimeIST = moment().tz("Asia/Kolkata");

          // Add 2 minutes to the current time
          const expireTimeIST = currentTimeIST.clone().add(2, "minutes");

          console.log(
            "Current Time (IST):",
            currentTimeIST.format("YYYY-MM-DD HH:mm:ss")
          );
          console.log(
            "Expire Time (IST):",
            expireTimeIST.format("YYYY-MM-DD HH:mm:ss")
          );

          const isNotExpired =
            new Date(result.rows[0].expireat).getTime() >= Date.now();

          if (isNotExpired) {
            if (Number(otp) === result.rows[0].otp) {
              res.status(200).send("OTP verified");
            } else {
              res.status(400).send("Invalid OTP");
            }
          } else {
            res.status(400).send("OTP has expired");
          }
        } else {
          res.status(404).send("OTP not found");
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default { GetAllPdfData };
