import request from "supertest";
import app from "../../app";

afterAll(async () => {
  const db = app.get("db");
  db.end();
});

describe("GET /auth/login", () => {
  describe("Test when no authentication is provided", () => {
    test("It should response code 401 (Missing Authentication)", () => {
      return request(app).get("/auth/login").expect(401);
    });
  });
  describe("Test when a false authentication is provided", () => {
    test("It should response code 401 (Authentication Failed)", () => {
      return request(app)
        .get("/auth/login")
        .auth("fake-username", "fake-password")
        .expect(401);
    });
  });
  describe("Test with a good authentication", () => {
    test("It should response code 200 (OK)", () => {
      return request(app)
        .get("/auth/login")
        .auth("admin", `${app.get("password")}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});

describe("GET /auth/login/*", () => {
  test("It should response error 404 (not found)", () => {
    return request(app).get("/auth/login/*").expect(404);
  });
});
