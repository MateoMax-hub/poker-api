import express from "express";
import { createOrder, webhook } from "../controllers/paymentController.js";
import { decodeToken } from "../middlewares/auth.js";

const router = express.Router()

router.post('/create-order', decodeToken, createOrder)
router.post('/webhook/:id', webhook)

export default router;
