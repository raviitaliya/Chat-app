import mongoose, { Schema, Document, model } from "mongoose";

// Define the Message schema
const messageSchema = new Schema(
  {
    message: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    msgById: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.models.Message || model("Message", messageSchema);

const conversationSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export the Conversation model
const ConversationModel =
  mongoose.models.Conversation || model("Conversation", conversationSchema);

export { ConversationModel, MessageModel };
