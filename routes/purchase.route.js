import express from "express";
import { intent, updateTickets } from "../controllers/purchase.controller.js";


const router = express.Router();


router.post("/create-payment-intent", intent )
router.put("/update", updateTickets )

export default router;