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

userRouter.post("/login", comparePass, loginUser);

userRouter.get("/", getUser);

userRouter.get("/:userName", getInfoByUsername);

module.exports = userRouter;
