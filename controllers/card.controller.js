import Card from "../models/card.model.js";

export const addCard = async (req, res, next) => {
  try {
    const card = new Card(req.body)
    await card.save()
    res.status(201).send("new card has been added...");
  } catch (error) {
    next(error)
  }
};


