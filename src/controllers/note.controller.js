import NoteModel from "../models/note.model.js";

const createNote = async (req, res) => {
  const { title, description } = req.body;

  if ((title, description) == "") {
    res.status(400).json({ message: "Fields Required" });
  }

  const newNote = new NoteModel({
    title: title,
    description: description,
    userId: req.userId,
  });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// for updating note
const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  if ((title, description) == "") {
    res.status(400).json({ message: "Fields Required" });
  }
  const newNote = {
    title: title,
    description: description,
    userId: req.userId,
  };

  try {
    await NoteModel.findByIdAndUpdate(id, newNote, { new: true });
    res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// for delete note
const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await NoteModel.findByIdAndRemove(id);
    res.status(202).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// for get note
const getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { createNote, updateNote, deleteNote, getNotes };
