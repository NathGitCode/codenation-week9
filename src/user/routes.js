const { Router } = require("express");
const userRouter = Router();

const { addUser, getUser, loginUser } = require("./controllers");

userRouter.post("/register", addUser);

userRouter.post("/login", loginUser);

userRouter.get("/", getUser);

module.exports = userRouter;
