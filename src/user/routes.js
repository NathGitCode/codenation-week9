const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/index");
const {
  addUser,
  getUser,
  loginUser,
  getInfoByUsername,
} = require("./controllers");

userRouter.post("/register", hashPass, addUser);

userRouter.post("/login", tokenCheck, comparePass, loginUser);

userRouter.get("/", getUser);

userRouter.get("/:userName", tokenCheck, getInfoByUsername);

module.exports = userRouter;
