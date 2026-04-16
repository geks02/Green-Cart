const express = require("express");
const {
  resgister,
  login,
  isAuth,
  logout,
} = require("../controllers/userController");
const authUser = require("../middlewares/authUser");

const userRouter = express.Router();

userRouter.post("/register", resgister);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);

module.exports = userRouter;
