import { Body, Get, Path, Post, Route, Tags } from "tsoa";
import { Comment } from "../models/comment.model";
import {
  createOne,
  getAll,
  getOne,
  ICommentPayload,
} from "../repositories/comment.repository";

@Route("comments")
@Tags("Comment")
export default class CommentController {
  @Get("/")
  public async getAll(): Promise<Array<Comment>> {
    return getAll();
  }

  @Post("/")
  public async createOne(@Body() body: ICommentPayload): Promise<Comment> {
    return createOne(body);
  }

  @Get("/:id")
  public async getOne(@Path() id: string): Promise<Comment | null> {
    return getOne(Number(id));
  }
}
