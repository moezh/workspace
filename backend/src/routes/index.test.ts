import request from "supertest";
import app from "../app";

afterAll(async () => {
  const db = app.get("db");
  db.end();
});

describe("GET /", () => {
  test("It should response error 404 (not found)", () => {
    return request(app).get("/").expect(404);
  });
});

describe("GET /*", () => {
  test("It should response error 404 (not found)", () => {
    return request(app).get("/*").expect(404);
  });
});
