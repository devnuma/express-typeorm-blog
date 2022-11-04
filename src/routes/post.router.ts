import { Router } from "express";
import PostController from "../controllers/post.controller";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/", async (_req, res) => {
  const response = await postController.getPosts();
  return res.send(response);
});

postRouter.post("/", async (req, res) => {
  const response = await postController.createPost(req.body);
  return res.send(response);
});

postRouter.get("/:id", async (req, res) => {
  const response = await postController.getPost(req.params.id);
  if (!response) return res.status(404).send({ message: "No post found" });
  return res.send(response);
});

export { postRouter };
