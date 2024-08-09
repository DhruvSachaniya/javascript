import express from "express";
import testcontroller from "../controller/testcontroller.js";

const router = express.Router();

router.get("/test", testcontroller.TestFunction);
router.post("/table", testcontroller.SetupDatabase);

export default router;
