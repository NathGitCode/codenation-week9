const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass } = require("../middleware/index");
const { addUser, getUser, loginUser } = require("./controllers");

userRouter.post("/register", hashPass, addUser);

userRouter.post("/login", comparePass, loginUser);

userRouter.get("/", getUser);

module.exports = userRouter;
