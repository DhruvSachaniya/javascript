import nodemailer from "nodemailer";
import pool from "../config/dbconfig.js";
import moment from "moment-timezone";

const getRandomInt = (max) => Math.floor(Math.random() * max);

const LoginUp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = getRandomInt(999999);

    const insertQuery = `
      INSERT INTO otp (otp, email, createAt, expireAt)
      VALUES ($1, $2,  $3 , $4);
    `;

    const currentTimeIST = moment().tz("Asia/Kolkata");

    const expireTimeIST = currentTimeIST.clone().add(2, "minutes");

    await pool.query(insertQuery, [
      otp,
      email,
      currentTimeIST.format("YYYY-MM-DD HH:mm:ss"),
      expireTimeIST.format("YYYY-MM-DD HH:mm:ss"),
    ]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your email",
        pass: "you password key",
      },
    });

    const mailOptions = {
      from: "email",
      to: email,
      subject: "from PDF-Convertor",
      text: `Your login OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (err, result) => {
      if (err) {
        console.log("Error sending email:", err);
      } else {
        console.log("Email sent: ", result.response);
      }
    });

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error in LoginUp:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const varifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const selectQuery = `
      SELECT * FROM otp WHERE otp = $1 AND email = $2;
    `;

    const result = await pool.query(selectQuery, [otp, email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "OTP not found or expired" });
    }

    if (currentTime <= expireTime) {
      return res.status(200).json({ message: "OTP verified" });
    } else {
      return res.status(400).json({ message: "OTP has expired" });
    }
  } catch (err) {
    console.error("Error in varifyOtp:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { LoginUp, varifyOtp };
