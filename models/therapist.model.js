import mongoose from "mongoose";
const { Schema } = mongoose;

const therapistSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    liscens: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isTherapist: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
    },
    appointments: {
      type: [
        {
          before: { type: String },
          date: { type: String },
          desc: { type: String },
          gender: { type: String },
          old: { type: Boolean },
          religious: { type: Boolean },
          status: { type: String },
          therapistName: { type: String },
          time: { type: String },
          type: { type: String },
          clientName: { type: String },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("therapist", therapistSchema);
