const { Router } = require("express");
const contactRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/index");
const { addContactInfo, getContactInfo } = require("./controllers");

contactRouter.post("/", addContactInfo);

contactRouter.get("/", getContactInfo);

module.exports = contactRouter;
