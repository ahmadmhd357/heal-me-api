import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import therapistRoute from "./routes/therapistAuth.route.js";
import purchaseRoute from "./routes/purchase.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "https://heal-me-app.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/therapist", therapistRoute);
app.use("/api/auth", authRoute);
app.use("/api/purchase", purchaseRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("backend server is running on port 8800");
});
