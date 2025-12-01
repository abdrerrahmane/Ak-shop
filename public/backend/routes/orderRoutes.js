const express = require("express");
const router = express.Router();
const {
  createOrder,
  getPending,
  getConfirmed,
  confirmOrder
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/pending", getPending);
router.get("/confirmed", getConfirmed);
router.put("/confirm/:id", confirmOrder);

module.exports = router;
