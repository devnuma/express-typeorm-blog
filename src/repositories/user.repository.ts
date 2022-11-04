import { appDataSource } from "../config/database";
import { User } from "../models/user.model";

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = appDataSource.getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = appDataSource.getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  return user || null;
};
