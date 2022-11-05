import * as postRepository from "../repositories/post.repository";
import PostController from "./post.controller";
import {
  generatePostData,
  generatePostsData,
  generatePostPayload,
} from "../../test/utils/generate";

afterEach(() => {
  jest.resetAllMocks();
});

describe("PostController", () => {
  const controller = new PostController();
  describe("getPosts", () => {
    test("should return empty array", async () => {
      const spy = jest
        .spyOn(postRepository, "getPosts")
        .mockResolvedValueOnce([]);
      const posts = await controller.getPosts();
      expect(posts).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return post list", async () => {
      const postList = generatePostsData(2);
      const spy = jest
        .spyOn(postRepository, "getPosts")
        .mockResolvedValueOnce(postList);
      const posts = await controller.getPosts();
      expect(posts).toEqual(postList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("addPost", () => {
    test("should add post to the database", async () => {
      const payload = generatePostPayload();
      const postData = generatePostData(payload);
      const spy = jest
        .spyOn(postRepository, "createPost")
        .mockResolvedValueOnce(postData);
      const post = await controller.createPost(payload);
      expect(post).toMatchObject(payload);
      expect(post).toEqual(postData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getPost", () => {
    test("should return post from the database", async () => {
      const id = 1;
      const postData = generatePostData({ id });
      const spy = jest
        .spyOn(postRepository, "getPost")
        .mockResolvedValueOnce(postData);
      const post = await controller.getPost(id.toString());
      expect(post).toEqual(postData);
      expect(post?.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return null if post not found", async () => {
      const id = 1;
      const spy = jest
        .spyOn(postRepository, "getPost")
        .mockResolvedValueOnce(null);
      const post = await controller.getPost(id.toString());
      expect(post).toBeNull();
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
