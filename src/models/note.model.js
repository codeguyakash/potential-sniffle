import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", NoteSchema);

export default NoteModel;
