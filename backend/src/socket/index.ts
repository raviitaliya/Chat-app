import express, { Application } from "express";
import { Server } from "socket.io";
import http, { Server as HTTPServer } from "http";
import dotenv from "dotenv";
import { userDetails } from '../controller/getUserFromToken';

dotenv.config();

const app: Application = express();
const server: HTTPServer = http.createServer(app);

const io: Server = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*", 
    credentials: true,
  },
});

const online: Set<string> = new Set(); 

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);

  const token: string | undefined = socket.handshake.auth.token;

  if (token) {
    const user = await userDetails(token);

    if (user) {
      const userId: string = user._id.toString(); 
      socket.join(userId);
      online.add(userId);
    } else {
      console.error("User not found based on token:", token);
    }
  } else {
    console.error("Token not provided in handshake auth:", socket.handshake.auth);
  }

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

export { server, app };
