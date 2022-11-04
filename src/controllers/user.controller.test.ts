import * as userRepository from "../repositories/user.repository";
import UserController from "./user.controller";
import {
  generateUserData,
  generateUserPayload,
  generateUsersData,
} from "../../test/utils/generate";

afterEach(() => {
  jest.resetAllMocks();
});

describe("UserController", () => {
  const controller = new UserController();
  describe("getUsers", () => {
    test("should return empty array", async () => {
      const spy = jest
        .spyOn(userRepository, "getUsers")
        .mockResolvedValueOnce([]);
      const users = await controller.getUsers();
      expect(users).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return user list", async () => {
      const userList = generateUsersData(2);
      const spy = jest
        .spyOn(userRepository, "getUsers")
        .mockResolvedValueOnce(userList);
      const users = await controller.getUsers();
      expect(users).toEqual(userList);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("addUser", () => {
    test("should add user to the database", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      const spy = jest
        .spyOn(userRepository, "createUser")
        .mockResolvedValueOnce(userData);
      const user = await controller.createUser(payload);
      expect(user).toMatchObject(payload);
      expect(user).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUser", () => {
    test("should return user from the database", async () => {
      const id = 1;
      const userData = generateUserData({ id });
      const spy = jest
        .spyOn(userRepository, "getUser")
        .mockResolvedValueOnce(userData);
      const user = await controller.getUser(id.toString());
      expect(user).toEqual(userData);
      expect(user?.id).toBe(id);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return null if user not found", async () => {
      const id = 1;
      const spy = jest
        .spyOn(userRepository, "getUser")
        .mockResolvedValueOnce(null);
      const user = await controller.getUser(id.toString());
      expect(user).toBeNull();
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
