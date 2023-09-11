import express from "express";
import { login, register, sendVerifyEmail, sendVerifyTokenResponse, userData, verifyEmail } from "../controllers/auth.js";
import { decodeToken, decodeVerifyToken, verifyJwt } from "./../middlewares/auth.js"

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/sendVerify', decodeToken, sendVerifyEmail)
router.get('/verify/:token', decodeVerifyToken, verifyEmail)
router.get('/verifyToken', verifyJwt, sendVerifyTokenResponse)
router.get('/userData', decodeToken, userData)

export default router;
