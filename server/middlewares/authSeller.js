const jwt = require("jsonwebtoken");

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode && tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

module.exports = authSeller;
