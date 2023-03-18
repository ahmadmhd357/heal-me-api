import User from "../models/user.model.js";
import Therapist from "../models/therapist.model.js";
import createError from "../utils/createError.js";

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    const name = req.body.fullName.split(" ");
    user.firstName = name[0];
    user.lastName = name[1];
    user.img = req.body.img;
    user.education = req.body.education;
    user.birth = req.body.birth;
    user.gender = req.body.gender;
    user.phone = req.body.phone;
    user.hobbies = req.body.hobbies;
    user.family = req.body.family;
    await user.save();
    const { password, ...data } = user._doc;
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    let user =
      (await User.findByIdAndDelete(req.body.id)) ||
      (await Therapist.findByIdAndDelete(req.body.id));
    res.status(200).send("account deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const bookApp = async (req, res, next) => {
  try {
    let user = await User.findById(req.body.id)
    if(user.tickets === 0) return next(createError(501,'Please make sure you have enough Tickets'))
     await User.findByIdAndUpdate(req.body.id, {
      $addToSet: { appointments: req.body.appointment }, $inc:{ tickets: -1 } 
    });
    let therapist = await Therapist.findOneAndUpdate(
      {username:req.body.appointment.therapistName},
      { $addToSet: { appointments: { ...req.body.appointment, clientName:user.firstName + " " + user.lastName}  } }
    );
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.body.id);
    const { password, ...data } = user._doc;
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
