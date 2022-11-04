import { appDataSource } from "../config/database";
import { Comment } from "../models/comment.model";

export interface ICommentPayload {
  content: string;
  userId: number;
  postId: number;
}

const repository = appDataSource.getRepository(Comment);

export const getAll = async (): Promise<Array<Comment>> => {
  return repository.find();
};

export const createOne = async (payload: ICommentPayload): Promise<Comment> => {
  const one = new Comment();
  return repository.save({
    ...one,
    ...payload,
  });
};

export const getOne = async (id: number): Promise<Comment | null> => {
  const one = await repository.findOneBy({ id });
  return one || null;
};
