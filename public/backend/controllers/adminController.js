const Admin = require("../models/Admin");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    return res.json({ success: false });
  }

  res.json({ success: true });
};
