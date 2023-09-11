import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import socketEndPoints from "./controllers/socketController.js";
import apiRoute from './routes/index.js'
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(
  `${process.env.MONGO_URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(morgan('short'));
app.use(express.json())
app.use(express.urlencoded())
app.use('/api', apiRoute)

io.on("connection", (socket) => {
  socketEndPoints.point(socket);
  socketEndPoints.connectRoom(socket);
  socketEndPoints.getOthersData(socket);
  socketEndPoints.reciveOthersData(socket);
  socketEndPoints.handleHand(socket);
  socketEndPoints.disconnect(socket, io);
});

server.listen(process.env.PORT);
console.log("Server started on port", process.env.PORT);
