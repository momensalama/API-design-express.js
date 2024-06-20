import * as user from "../user";

describe("user handler", () => {
  it("should return a user", async () => {
    const req = {
      body: {
        username: "test",
        password: "test",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeDefined();
      },
    };

    await user.createNewUser(req, res, () => {});
  });
});
