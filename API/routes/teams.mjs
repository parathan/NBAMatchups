import express from "express";
import db from "../db/connection.mjs"
import { ObjectId } from "mongodb";

const router = express.Router()

router.post("/", async (req, res) => {
    res.send("Nice").status(204)
});

export default router;