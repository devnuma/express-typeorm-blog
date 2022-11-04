import PingController from "./ping.controller";

test("it should pass", async () => {
  expect(true).toBe(true);
});

const controller = new PingController();
test("should return pong message", async () => {
  const response = await controller.getMessage();
  expect(response?.message).toBe("pong");
});
