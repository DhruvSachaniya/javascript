import express from "express";
import allpdfcontroller from "../controller/allpdfcontroller.js";

const router = express.Router();

router.get("/all", allpdfcontroller.GetAllPdfData);

export default router;
