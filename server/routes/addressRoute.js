const express = require("express");
const { addAddress, getAddress } = require("../controllers/addressController");
const authUser = require("../middlewares/authUser");

const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/get", authUser, getAddress);

module.exports = addressRouter;
