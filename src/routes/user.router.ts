import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", async (_req, res) => {
  const response = await userController.getUsers();
  return res.send(response);
});

userRouter.post("/", async (req, res) => {
  const response = await userController.createUser(req.body);
  return res.send(response);
});

userRouter.get("/:id", async (req, res) => {
  const response = await userController.getUser(req.params.id);
  if (!response) return res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export { userRouter };
