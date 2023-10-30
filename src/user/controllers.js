const User = require("./model");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "success", newUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error });
      return;
    }
    res.status(500).json({ message: error.message, error });
  }
};

const getUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(201).json({ message: "success", allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await jwt.sign({ id: req.body.id }, process.env.SECRET_KEY);
    console.log(token);
    const returnMessage = {
      message: "Logged in",
      user: {
        userName: req.body.userName,
        token: token,
      },
    };
    res.status(201).json(returnMessage);
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getInfoByUsername = async (req, res) => {
  try {
    const findByUsername = await User.findOne({
      where: { userName: req.params.userName },
    });
    res.status(201).json({ message: "success", findByUsername });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { addUser, getUser, loginUser, getInfoByUsername };
