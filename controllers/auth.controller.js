import User from "../models/user.model.js";
import Therapist from "../models/therapist.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(201).send("new user has been created...");
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await Therapist.findOne({ email: req.body.email });
    }
    if (!user) return next(createError(404, "user not found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "wrong password or email"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    const { password, ...data } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const logOut = (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
