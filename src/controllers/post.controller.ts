import { Body, Get, Path, Post, Route, Tags } from "tsoa";
import { PostModel } from "../models/post.model";
import {
  createPost,
  getPost,
  getPosts,
  IPostPayload,
} from "../repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {
  @Get("/")
  public async getPosts(): Promise<Array<PostModel>> {
    return getPosts();
  }

  @Post("/")
  public async createPost(@Body() body: IPostPayload): Promise<PostModel> {
    return createPost(body);
  }

  @Get("/:id")
  public async getPost(@Path() id: string): Promise<PostModel | null> {
    return getPost(Number(id));
  }
}
