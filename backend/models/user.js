import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  encryptedMnemonic: { type: String, required: true },
});

export default mongoose.model("User", userSchema);

