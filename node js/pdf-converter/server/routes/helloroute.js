import express from "express";
import { HelloWorld } from "../controller/hellocontroller.js";

const router = express.Router();

router.get("/hello", HelloWorld);

export default router;
