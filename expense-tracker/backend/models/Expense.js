const mongoose = require("mongoose");
module.exports = mongoose.model("Expense", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, default: "Cash" },
  date: { type: Date, default: Date.now },
  description: { type: String, default: "" },
}));
