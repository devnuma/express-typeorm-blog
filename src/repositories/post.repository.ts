import { appDataSource } from "../config/database";
import { Post } from "../models/post.model";

export interface IPostPayload {
  title: string;
  content: string;
  userId: number;
}

const repository = appDataSource.getRepository(Post);

export const getPosts = async (): Promise<Array<Post>> => {
  return repository.find();
};

export const createPost = async (payload: IPostPayload): Promise<Post> => {
  const post = new Post();
  return repository.save({
    ...post,
    ...payload,
  });
};

export const getPost = async (id: number): Promise<Post | null> => {
  const post = await repository.findOneBy({ id });
  return post || null;
};
