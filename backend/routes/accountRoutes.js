import express from "express";
import { saveAccount } from "../controllers/accountsController";
const router = express.Router();


router.post("/accounts", saveAccount)

export default router;