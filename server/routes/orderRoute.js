const express = require("express");
const orderRouter = express.Router();
const authUser = require("../middlewares/authUser");
const authSeller = require("../middlewares/authSeller");
const {
  placeOrderCOD,
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController");

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);

module.exports = orderRouter;
