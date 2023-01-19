import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";

afterAll(async () => {
  const db = app.get("db");
  db.end();
});

describe("GET /api/blog/config", () => {
  describe("Test when no authorization is provided", () => {
    test("It should response code 401 (Missing Authentication)", () => {
      return request(app).get("/api/blog/config").expect(401);
    });
  });
  describe("Test when a false authorization is provided", () => {
    test("It should response code 401 (Authentication Failed)", () => {
      return request(app)
        .get("/api/blog/config")
        .set("Authorization", `Bearer NON_VALID_TOKEN`)
        .expect(401);
    });
  });
  describe("Test with a good authorization", () => {
    test("It should response code 200 (OK)", () => {
      return request(app)
        .get("/api/blog/config")
        .set(
          "Authorization",
          `Bearer ${jwt.sign("admin", app.get("password"))}`
        )
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});

describe("GET /api/blog/*", () => {
  test("It should response error 404 (not found)", () => {
    return request(app)
      .get("/api/blog/*")
      .set("Authorization", `Bearer ${jwt.sign("admin", app.get("password"))}`)
      .expect(404);
  });
});
