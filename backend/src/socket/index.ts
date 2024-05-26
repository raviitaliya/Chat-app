import express, { Application } from "express";
import { Server, Socket } from "socket.io";
import http, { Server as HTTPServer } from "http";
import dotenv from "dotenv";
import { userDetails } from "../controller/getUserFromToken";
import UserModel from "../Models/UserModel";
import { ConversationModel, MessageModel } from "../Models/ConversationModel";

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
  console.log("A user connected", socket.id);

  let user: any = null;
  const token: string | undefined = socket.handshake.auth.token;

  if (token) {
    try {
      user = await userDetails(token);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }

    if (user) {
      const userId: string = user._id.toString();
      socket.join(userId);
      online.add(userId);

      io.emit("onlineuser", Array.from(online));
    } else {
      console.error("User not found based on token:", token);
    }
  } else {
    console.error(
      "Token not provided in handshake auth:",
      socket.handshake.auth
    );
  }

  socket.on("userId", async (data) => {
    try {
      const user = await UserModel.findById(data.resiver).select("-password");

      if (user) {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          profile_Pic: user.profile_pic,
          online: online.has(data.resiver),
        };

        socket.emit("user", payload);

        const updatedConversation = await ConversationModel.findOne({
          $or: [
            { sender: data.sender, receiver: data.resiver },
            { sender: data.resiver, receiver: data.sender },
          ],
        })
          .populate("messages")
          .sort({ updatedAt: -1 });


        if (updatedConversation) {
          socket.emit("message", updatedConversation.messages);
        }else{
          socket.emit("message", "");
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  });

  // New message
  socket.on("NewMessage", async (data) => {
    try {
      let conversation = await ConversationModel.findOne({
        $or: [
          { sender: data?.sender, receiver: data?.receiver },
          { sender: data?.receiver, receiver: data?.sender },
        ],
      });

      if (!conversation) {
        conversation = new ConversationModel({
          sender: data?.sender,
          receiver: data?.receiver,
        });
        await conversation.save();
      }

      const message = new MessageModel({
        message: data.message,
        image: data.image,
        video: data.video,
        msgById: data.msgById,
      });
      const savedMessage = await message.save();

      conversation.messages.push(savedMessage._id);
      await conversation.save();

      const updatedConversation = await ConversationModel.findById(
        conversation._id
      ).populate("messages");

      if (updatedConversation) {
        io.to(data?.sender).emit("message", updatedConversation.messages);
        io.to(data?.receiver).emit("message", updatedConversation.messages);
      }
    } catch (error) {
      console.error("Error handling NewMessage event:", error);
    }
  });

  socket.on("disconnect", () => {
    if (user) {
      const userId: string = user._id.toString();
      online.delete(userId);
      io.emit("onlineuser", Array.from(online));
    }
    console.log("User disconnected", socket.id);
  });
});

export { server, app };
