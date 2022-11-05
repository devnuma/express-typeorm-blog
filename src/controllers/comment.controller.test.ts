import * as commentRepository from "../repositories/comment.repository";
import CommentController from "./comment.controller";
import {
  generateCommentData,
  generateCommentsData,
  generateCommentPayload,
} from "../../test/utils/generate";

afterEach(() => {
  jest.resetAllMocks();
});

describe("CommentController", () => {
  const controller = new CommentController();
  describe("getComments", () => {
    test("should return empty array", async () => {
      const spy = jest
        .spyOn(commentRepository, "getAll")
        .mockResolvedValueOnce([]);
      const comments = await controller.getAll();
      expect(comments).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return comment list", async () => {
      const commentList = generateCommentsData(2);
      const spy = jest
        .spyOn(commentRepository, "getAll")
        .mockResolvedValueOnce(commentList);
      const comments = await controller.getAll();
      expect(comments).toEqual(commentList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("addComment", () => {
    test("should add comment to the database", async () => {
      const payload = generateCommentPayload();
      const commentData = generateCommentData(payload);
      const spy = jest
        .spyOn(commentRepository, "createOne")
        .mockResolvedValueOnce(commentData);
      const comment = await controller.createOne(payload);
      expect(comment).toMatchObject(payload);
      expect(comment).toEqual(commentData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getComment", () => {
    test("should return comment from the database", async () => {
      const id = 1;
      const commentData = generateCommentData({ id });
      const spy = jest
        .spyOn(commentRepository, "getOne")
        .mockResolvedValueOnce(commentData);
      const comment = await controller.getOne(id.toString());
      expect(comment).toEqual(commentData);
      expect(comment?.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return null if comment not found", async () => {
      const id = 1;
      const spy = jest
        .spyOn(commentRepository, "getOne")
        .mockResolvedValueOnce(null);
      const comment = await controller.getOne(id.toString());
      expect(comment).toBeNull();
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
