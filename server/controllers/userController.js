const User = require("../models/userModels");


const saveUser = async (req, res) => {
  try {
    const { name, email , photoURL} = req.body;

    const findUser = await User.findOne({email: email});
    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email , photoURL});

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    } else {
      return res.status(200).send({ 
        message: "User created successfully",
        id: user._id,
        name: user.name,
        email: user.email
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveUser , findUser };
