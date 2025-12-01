const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
};

exports.getPending = async (req, res) => {
  const orders = await Order.find({ status: "pending" }).sort({ date: -1 });
  res.json(orders);
};

exports.getConfirmed = async (req, res) => {
  const orders = await Order.find({ status: "confirmed" }).sort({ date: -1 });
  res.json(orders);
};

exports.confirmOrder = async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: "confirmed" });
  res.json({ success: true });
};
