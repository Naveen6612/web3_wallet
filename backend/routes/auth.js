import express from "express";
import { register, login, connectWallet } from "../controllers/authController.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/connect", connectWallet);

// router.post("/generate-mnemonic", mnemonic)

export default router;
