import express from "express";
import bodyParser from "body-parser";
import indexpdfroute from "./routes/pdfconroute.js";
import helloroute from "./routes/helloroute.js";
import testroute from "./routes/testroute.js";
import alldataroute from "./routes/alldataroute.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/pdfs", express.static("pdfs"));
app.use("/images", express.static("images"));

app.use("/", indexpdfroute, helloroute, testroute, alldataroute);

app.listen(3333, () => {
  console.log(`Server is running on ${3333}`);
});
