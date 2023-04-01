import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import socketEndPoints from "./controllers/socketController.js";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket) => {
  socketEndPoints.point(socket);
  socketEndPoints.connectRoom(socket);
  socketEndPoints.getOthersData(socket);
  socketEndPoints.reciveOthersData(socket);
});

server.listen(process.env.PORT);
console.log("Server started on port", process.env.PORT);
