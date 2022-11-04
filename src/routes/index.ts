import { Router } from "express";
import PingController from "../controllers/ping.controller";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

const router = Router();

router.get("/ping", async (req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
