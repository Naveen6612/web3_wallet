import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.js";
import dotenv from "dotenv";
import e from "express";
dotenv.config();
const secretKey = process.env.CRYPTO_SECRET; // set in .env

const IV_LENGTH = 16; // AES block size
// console.log("CRYPTO_SECRET:", process.env.CRYPTO_SECRET);
// console.log("CRYPTO_SECRET length:", process.env.CRYPTO_SECRET?.length);

// Encryption
export const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-ctr",
      Buffer.from(secretKey),
      iv
    );
    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  } catch (err) {
    console.error("Encryption failed:", err);
    throw new Error("Encryption failed");
  }
};

// Decryption
export const decrypt = (text) => {
  try {
    const [ivHex, encryptedHex] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      Buffer.from(secretKey),
      iv
    );
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decryption failed:", err);
    throw new Error("Decryption failed");
  }
};
export const register = async (req, res) => {
  try {
    const { uuid, mnemonic } = req.body;

    if (!uuid || !mnemonic) {
      return res.status(400).json({ message: "UUID and mnemonic are required." });
    }

    const encryptedMnemonic = encrypt(mnemonic);

    const newUser = new User({ uuid, encryptedMnemonic });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Error in register route:", error); // ✅ Corrected variable
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({passwordHash}); // change logic to find correct user
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const mnemonic = decrypt(user.encryptedMnemonic);

  res.json({ token, mnemonic });
};

export const connectWallet = async (req, res) => {
  try {
    const { mnemonic } = req.body;
    if (!mnemonic) {
      return res.status(400).json({ message: "Mnemonic required" });
    }

    const users = await User.find();

    for (const user of users) {
      const decryptedMnemonic = decrypt(user.encryptedMnemonic);
      if (decryptedMnemonic === mnemonic) {
        return res.status(200).json({
          message: "Wallet connected",
          uuid: user.uuid,
        });
      }
    }

    return res.status(401).json({ message: "Invalid mnemonic" });

  } catch (err) {
    console.error("Error in connectWallet:", err);
    return res.status(500).json({ message: "Server error" });
  }
};