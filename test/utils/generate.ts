import { faker } from "@faker-js/faker";
import { PostModel } from "../../src/models/post.model";
import { User } from "../../src/models/user.model";

export function generateUserData(override = {}) {
  return {
    id: Number(faker.random.numeric()),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    posts: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

export function generateUsersData(n: number = 1, override = {}) {
  return Array.from({ length: n }, (_, i) => {
    return generateUserData({ id: i, ...override });
  });
}

export function generateUserPayload() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  };
}

export function generatePostData(override = {}) {
  return {
    id: Number(faker.random.numeric()),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: Number(faker.random.numeric()),
    comments: [],
    user: new User(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

export function generatePostsData(n: number = 1, override = {}) {
  return Array.from({ length: n }, (_, i) => {
    return generatePostData({ id: i, ...override });
  });
}

export function generatePostPayload() {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: Number(faker.random.numeric()),
  };
}

export function generateCommentData(override = {}) {
  return {
    id: Number(faker.random.numeric()),
    content: faker.lorem.paragraph(),
    userId: Number(faker.random.numeric()),
    user: new User(),
    postId: Number(faker.random.numeric()),
    post: new PostModel(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

export function generateCommentsData(n: number = 1, override = {}) {
  return Array.from({ length: n }, (_, i) => {
    return generateCommentData({ id: i, ...override });
  });
}

export function generateCommentPayload() {
  return {
    content: faker.lorem.paragraph(),
    userId: Number(faker.random.numeric()),
    postId: Number(faker.random.numeric()),
  };
}
