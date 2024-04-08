import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controller.js";
import { auth } from "../middleware/auth.js";

const noteRouter = express.Router();

noteRouter.get("/", auth, getNotes);
noteRouter.post("/", auth, createNote);
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.put("/:id", auth, updateNote);

export default noteRouter;
