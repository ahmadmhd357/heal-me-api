import express from "express";
import {
  register,
  updateProfile,
  getTherapists,
} from "../controllers/therapistAuth.controller.js";

const router = express.Router();

router.post("/register", register);
router.put("/profile", updateProfile);
router.get("/therapists", getTherapists);

export default router;
