const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  wilaya: String,
  address: String,
  product: String,
  color: String,
  size: String,
  note: String,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
