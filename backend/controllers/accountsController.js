
// import accountSchema from "../models/AccountModel.js";

// // controllers/accountController.js
// export const saveAccount = async (req, res) => {
//   const { userId, address, index, name, balance } = req.body;

//   if (!userId || !address) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   try {
//     await accountSchema.create({
//       userId,
//       address,
//       index,
//       name,
//       balance,
//       createdAt: new Date(),
//     });

//     res.status(201).json({ message: "Account saved" });
//   } catch (err) {
//     console.error("Error saving account:", err);
//     res.status(500).json({ message: "Internal error" });
//   }
// };
