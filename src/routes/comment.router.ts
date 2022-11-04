import { Router } from "express";
import CommentController from "../controllers/comment.controller";
import PostController from "../controllers/post.controller";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get("/", async (_req, res) => {
  const response = await commentController.getAll();
  return res.send(response);
});

commentRouter.post("/", async (req, res) => {
  const response = await commentController.createOne(req.body);
  return res.send(response);
});

commentRouter.get("/:id", async (req, res) => {
  const response = await commentController.getOne(req.params.id);
  if (!response) return res.status(404).send({ message: "Not found" });
  return res.send(response);
});

export { commentRouter };
