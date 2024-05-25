import mongoose from "mongoose";

const mesageScema = new mongoose.Schema(
  {
    text:{
      type : String,
      default : ""
    },
    imageUrl:{
      type : String,
      default : ""
    },
    videoUrl:{
      type : String,
      default : ""
    },
    seen:{
      type : Boolean,
      default : false,
    }
  },
  {
    timestamps: true,
  }
);

const conversationSemantic = new mongoose.Schema({
  sender:{
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
  },
  receiver:{
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "User"
  },
  messages:[
    {
      type : mongoose.Schema.Types.ObjectId,
      required : true
    }
  ]
})

const messageModel = mongoose.model("User", mesageScema);
const conversationModel= mongoose.model("Users", conversationSemantic);

export {messageModel, conversationModel};

