import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    education: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    birth: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    img: {
      type: String,
    },
    family: {
      type: String,
    },
    tickets: {
      type: Number,
      default: 0,
    },
    appointments: 
      {type: [
        {
          before: {type:String},
          date: {type:String},
          desc: {type:String},
          gender: {type:String},
          old: {type:Boolean},
          religious: {type:Boolean},
          status: {type:String},
          therapistName: {type:String},
          time: {type:String},
          type: {type:String},
        }
      ],}
      
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
