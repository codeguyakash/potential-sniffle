import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import dotenv from "dotenv";
import os from "os";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length;

app.use(express.json());
app.use(cors());

export const startServer = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    app.use("/users", userRouter);
    app.use("/note", noteRouter);
    let count = 0;
    app.get("/", (_, res) => {
      console.log("requests", count);
      count++;
      res.send({ process: process.pid, numberOfCpu: numCPUs });
    });

    app.listen(PORT, () => {
      let pid = process.pid;
      console.log(`{PORT:${PORT}} {PID:${pid}}`, pid);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
