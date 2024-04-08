import express from "express";
import { signup, signin, getUser } from "../controllers/user.cntroller.js";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/okk", getUser);

export default userRouter;
