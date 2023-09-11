import mercadopago from "mercadopago";
import dotenv from "dotenv";
import User from "./../models/Users.js";
import Payment from "./../models/Payments.js";
dotenv.config();

export const createOrder = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });
    const userFound = await User.findById(req.userId);
    const newPayment = new Payment({ userId: userFound._id });
    await newPayment.save();
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Plan basico",
          unit_price: 5000,
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      payer: {
        email: userFound.email,
      },
      back_urls: {
        success: 'http://127.0.0.1:5173/success',
        failure: 'http://127.0.0.1:5173/failure'
      },
      auto_return: 'approved',
      notification_url:
        `https://1f52-181-12-234-66.ngrok.io/api/payment/webhook/${userFound._id}`,
    });
    res.status(200).json({
      message: "Link de pago creado con exito",
      link: result?.response?.init_point,
    });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

export const webhook = async (req, res) => {
  try {
    if (req.query["data.id"]) {
      const result = await mercadopago.payment.findById(req.query["data.id"]);
      if (result.body.status === 'approved') { //body.description === 'plan'
        await Payment.findOneAndUpdate({ userId: req.params.id }, { status: result.body.status })
      }
    }
    res.send("webhook");
  } catch (error) {
    console.log(error);
  }
};
