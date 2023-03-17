import Therapist from "../models/therapist.model.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const isClient = await User.findOne({ email: req.body.email });
    if (isClient)
      return next(
        createError(
          500,
          " you can't have two accounts on the same email please delete your old account first "
        )
      );
    const newTherapist = new Therapist({ ...req.body, password: hash });
    await newTherapist.save();
    res.status(201).send("new Therapist has been created...");
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const therapist = await Therapist.findById(req.body.id);

    therapist.username = req.body.username;
    therapist.img = req.body.img;
    therapist.city = req.body.city;
    therapist.liscens = req.body.liscens;

    await therapist.save();
    const { password, ...data } = therapist._doc;
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const getTherapists = async (req, res, next) => {
  try {
    const therapists = await Therapist.find();
    res.status(200).send(therapists);
  } catch (error) {
    next(error)
  }
  
};

