import express from "express";
import {bookApp, deleteProfile, getUser, updateProfile} from '../controllers/user.controller.js'

const router = express.Router();

router.put("/profile", updateProfile);
router.put("/book", bookApp);
router.post("/delete", deleteProfile);
router.get("/user", getUser);


export default router;
