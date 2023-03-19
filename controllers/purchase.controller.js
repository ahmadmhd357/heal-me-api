import Stripe from "stripe";
import User from "../models/user.model.js";
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIP);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTickets = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    user.tickets = user.tickets + Number(req.body.tickets);
    await user.save();
    const { password, ...data } = user._doc;
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
