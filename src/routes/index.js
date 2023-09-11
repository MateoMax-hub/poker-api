import express from "express";
import auth from "./auth.js"
import payment from "./payment.js"

const router = express.Router()

router.use('/users', auth)
router.use('/payment', payment)

export default router;
