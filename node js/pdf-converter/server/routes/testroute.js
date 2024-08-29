import express from "express";
import testcontroller from "../controller/testcontroller.js";
import testmiddle from "../middleware/testmiddle.js";

const router = express.Router();

router.post("/test", testmiddle.auth, testcontroller.TestFunction);
router.post("/table", testcontroller.SetupDatabase);

export default router;
