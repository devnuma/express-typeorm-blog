import { appDataSource } from "../config/database";
import { PostModel } from "../models/post.model";

export interface IPostPayload {
  title: string;
  content: string;
  userId: number;
}

const repository = appDataSource.getRepository(PostModel);

export const getPosts = async (): Promise<Array<PostModel>> => {
  return repository.find();
};

export const createPost = async (payload: IPostPayload): Promise<PostModel> => {
  const post = new PostModel();
  return repository.save({
    ...post,
    ...payload,
  });
};

export const getPost = async (id: number): Promise<PostModel | null> => {
  const post = await repository.findOneBy({ id });
  return post || null;
};
