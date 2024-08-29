import express from "express";
import authcontroller from "../controller/authcontroller.js";

const router = express.Router();

router.post("/login", authcontroller.LoginUp);
router.post("/varify", authcontroller.varifyOtp);

export default router;
