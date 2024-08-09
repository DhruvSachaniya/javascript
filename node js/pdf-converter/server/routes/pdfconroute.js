import express from "express";
import { pdfConverter } from "../controller/pdfconverter.js";

const router = express.Router();

router.post("/pdf", pdfConverter);

export default router;
