const { v2: cloudinary } = require("cloudinary");
const Product = require("../models/Product");

//Add Product : /api/product/add
const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    // FIX 1: Use Promise.all() instead of Promise()
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        // FIX 2: Corrected typo 'reault' to 'result'
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    await Product.create({ ...productData, image: imagesUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get Product : /api/product/list
const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get Single Product : /api/product/id
const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const products = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Change Product inStock : /api/product/stock
const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
    ƒ;
  }
};

module.exports = { addProduct, productList, productById, changeStock };
