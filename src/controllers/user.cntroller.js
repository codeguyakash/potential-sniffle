import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if ((username, email, password) == "") {
    return res.status(400).json({ massege: "All Field Required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY
    );

    const userWithoutPassword = { ...result.toObject() };
    delete userWithoutPassword.password;
    
    res.status(201).json({ user: userWithoutPassword, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massege: "Something went wrong" });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  if ((email, password) == "") {
    return res.status(400).json({ massege: "All Field Required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY
    );

    const userWithoutPassword = { ...existingUser.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({ user: userWithoutPassword, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massege: "Something went wrong" });
  }
};
const getUser = async (req, res) => {
  try {
    const notes = await UserModel.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { signin, signup, getUser };
