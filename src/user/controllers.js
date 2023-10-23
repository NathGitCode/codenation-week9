const User = require("./model");

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
    res.status(201).json({ message: "Logged in" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { addUser, getUser, loginUser };
