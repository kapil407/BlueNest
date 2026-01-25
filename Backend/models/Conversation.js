import mongoose from "mongoose";
const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        // Array of reference that ref to the User  Model or store the
        // ids of Users who participates in connversation
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    messageId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const Conversation = mongoose.model("Conversation", ConversationSchema);
