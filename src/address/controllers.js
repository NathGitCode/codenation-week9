const Contact = require("./model");
const jwt = require("jsonwebtoken");

const addContactInfo = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ message: "success", newContact });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getContactInfo = async (req, res) => {
  try {
    const allContact = await Contact.findAll();
    res.status(201).json({ message: "success", allContact });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addContactInfo, getContactInfo };
