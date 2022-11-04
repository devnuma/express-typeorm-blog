import { faker } from "@faker-js/faker";

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
