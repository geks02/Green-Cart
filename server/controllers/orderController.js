const Order = require("../models/Order");
const Product = require("../models/Product");

//Place Order COD : /api/order/cod
const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invaild data" });
    }
    //Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    //Add Tax Charge (2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Get Orders by User Id : /api/order/user
const getUserOrders = async (req, res) => {
  try {
    // Middleware ne 'req.userId' set kiya hai, isliye hum wahi use karenge
    const userId = req.userId;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized Access" });
    }

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Get All Orders (for seller / admin) : /api/order/seller
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product") // Populate product details
      .populate("address") // Populate address if it's a separate ref
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { placeOrderCOD, getUserOrders, getAllOrders };
