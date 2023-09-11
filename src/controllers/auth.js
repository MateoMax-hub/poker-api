import dotenv from "dotenv";
import User from "./../models/Users.js" 
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import path from "path"
import fs from "fs";
import { fileURLToPath } from 'url';
dotenv.config();

export const sendVerifyTokenResponse = async (req, res) => {
    try {
        res.status(400).json({ message: 'Token validado', tokenOk: true })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

export const sendVerifyEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'PokerPlanningNoReply@gmail.com',
                pass: 'snicewvijkzbvlsa',
            },
        });
        const userFound = await User.findById(req.userId)
        if (!userFound) return res.status(400).json({ message: 'No se pudo encontrar usuario para enviar el codigo' })
        const payload = {
            user: {
                id: userFound._id,
            },
        };
        jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '3h' }, async (error, token) => {
            if (error) {
                throw error;
            }
            await transporter.sendMail({
                from: '<PokerPlanningNoReply@gmail.com>',
                to: userFound.email,
                subject: 'Código de verificacion de Poker Planning!',
                html: `
                <!DOCTYPE html>
    <html lang="en">
    <body>
        Aprieta click en el link de abjo para verificar tu email!
        <a href="http://localhost:4000/api/verify/${token}">http://localhost:4000/api/verify/${token}</a>
    </body>
    </html>`,
            });
            res.status(200).json({ message: 'Email enviado' });
        })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { userVerifyToken } = req
        const userVerifyFound = await User.findById(userVerifyToken)
        if (!userVerifyFound) return res.status(400).json({ message: 'Token incorrecto' })
        await User.findOneAndUpdate({ _id: userVerifyFound._id }, { emailConfirmed: true })
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename)
        res.sendFile(path.join(__dirname, './../htmlResponses/emailVerifySucced.html'));
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        const emailInUse = await User.findOne({ email })
        if (emailInUse) return res.status(400).json({ message: 'El email seleccionado ya esta en uso' })
        const salt = await bcryptjs.genSalt(10);
        const encryptedPass = await bcryptjs.hash(password, salt);
        const userData = {
            ...rest,
            email,
            password: encryptedPass,
            emailConfirmed: false
        }
        const newUser = new User(userData);
        await newUser.save();

        const payload = {
            user: {
                id: newUser._id,
            },
        };
        jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '3h' }, (error, token) => {
            if (error) {
                throw error;
            }
            res.status(200).json({ message: 'Registro exitoso', token });
        })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });
        
        if (!userFound) return res.status(400).json({ message: 'Contraseña o email incorrecto' })
        
        const logInSucced = await bcryptjs.compare(password, userFound?.password);

        if (!logInSucced) return res.status(400).json({ message: 'Contraseña o email incorrecta' })

        const payload = {
            user: {
                id: userFound._id,
            },
        };

        jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                throw error;
            }
            res.status(200).json({ message: 'Logeo exitoso', token });
        })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

export const userData = async (req, res) => {
    try {
        const userFound = await User.findById(req.userId);
        res.status(200).json({ message: 'Usuario encontrado con exito', userData: userFound });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}
