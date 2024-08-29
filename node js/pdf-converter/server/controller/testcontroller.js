import pool from "../config/dbconfig.js";

async function TestFunction(req, res) {
  try {
    // console.log(req.headers.authorization);
    // var token = jwt.sign(
    //   {
    //     data: "foobar",
    //   },
    //   "secret",
    //   { expiresIn: "1h" }
    // );
    res.status(200).json({ message: "this is from test!" });
  } catch (err) {
    console.log(err);
  }
}

async function SetupDatabase(req, res) {
  try {
    //email, otp, expire time, created time
    const query = `
      CREATE TABLE OTP (
        OtpId SERIAL PRIMARY KEY,
        otp INT NOT NULL,
        Email VARCHAR(155),
        createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expireAt TIMESTAMP NOT NULL
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
