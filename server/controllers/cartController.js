const { v2: cloudinary } = require("cloudinary");
const User = require("../models/User");

// Update User CartData : /api/cart/update
const updateCart = async (req, res) => {
  try {
    // ✅ FIX: Getting userId securely from your auth middleware
    const userId = req.userId;
    const { cartItems } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login.",
      });
    }

    // Update the database with the new cart items
    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { updateCart };
