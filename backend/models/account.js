// models/Account.js
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  address: { type: String, required: true },
  index: { type: Number, required: true },
  name: { type: String },
  balance: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Account", accountSchema);
