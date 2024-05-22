import express, { Application } from "express";
import { Server, Socket } from "socket.io";
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

io.on("connection", async (socket: Socket) => {
  console.log("a user connected", socket.id);
  
  let user: any = null;
  const token: string | undefined = socket.handshake.auth.token;

  if (token) {
    user = await userDetails(token);

    if (user) {
      const userId: string = user._id.toString(); 
      socket.join(userId);
      online.add(userId);

      io.emit('onlineuser', Array.from(online));
    } else {
      console.error("User not found based on token:", token);
    }
  } else {
    console.error("Token not provided in handshake auth:", socket.handshake.auth);
  }

  socket.on("disconnect", () => {
    if (user) {
      const userId: string = user._id.toString(); 
      online.delete(userId);
      io.emit('onlineuser', Array.from(online));
    }
    console.log("user disconnected", socket.id);
  });
});

export { server, app };
