const express = require("express");
const upload = require("../configs/multer");
const authSeller = require("../middlewares/authSeller");
const {
  addProduct,
  productList,
  productById,
  changeStock,
} = require("../controllers/productController");
const productRouter = express.Router();

productRouter.post("/add", authSeller, upload.array("images", 5), addProduct);
productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStock);

module.exports = productRouter;
