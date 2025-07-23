import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import accountRoutes from "./routes/accounts.js"
const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://web3-wallet-1.onrender.com"],
  credentials: true
}));

import healthRouter from "./routes/healthCheck.js"

app.use("/health-check", healthRouter  )

app.use("/api/auth", authRoutes );
app.use("/api/account/", accountRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
