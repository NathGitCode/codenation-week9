const bcrypt = require("bcrypt");
const User = require("../user/model");
const jwt = require("jsonwebtoken");
const Contact = require("../address/model");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { userName: req.body.userName } });
    if (!user) {
      res.status(401).json({ message: "Invalid username" });
      return;
    }
    const password = await bcrypt.compare(req.body.password, user.password);

    if (!password) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

const tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      const error = new Error("User is not authorised");
      res.status(401).json({ errorMessage: error.message, error: error });
    }

    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

module.exports = {
  hashPass,
  comparePass,
  tokenCheck,
};
