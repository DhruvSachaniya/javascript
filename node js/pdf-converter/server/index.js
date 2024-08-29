import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import indexpdfroute from "./routes/pdfconroute.js";
import helloroute from "./routes/helloroute.js";
import testroute from "./routes/testroute.js";
import alldataroute from "./routes/alldataroute.js";
import authRoute from "./routes/authroute.js";

const app = express();

//TODO:- create authantication, demo of otp verfication

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/pdfs", express.static("pdfs"));
app.use("/images", express.static("images"));

app.use("/", indexpdfroute, helloroute, testroute, alldataroute, authRoute);

app.listen(3333, () => {
  console.log(`Server is running on ${3333}`);
});
