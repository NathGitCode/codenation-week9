const bcrypt = require("bcrypt");

const User = require("../user/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

// find the user
// compare password
// 1 a. username incorrect
// 1 b. password incorrect
// 2. works

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

module.exports = {
  hashPass,
  comparePass,
};
