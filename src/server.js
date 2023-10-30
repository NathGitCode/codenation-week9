require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./user/model");
const Contact = require("./address/model");
const userRouter = require("./user/routes");
const contactRouter = require("./address/routes");

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/contact", contactRouter);

const syncTables = async () => {
  await User.sync();
  await Contact.sync();
};

app.get("/health", (req, res) => {
  res.json(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log("app is listening");
});
