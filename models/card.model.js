import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    cardName: {
      type: String,
      required: true,
    },
    cardDate: {
      type: Date,
      required: true,
    },
    ccv: {
      type: Number,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("card", cardSchema);
