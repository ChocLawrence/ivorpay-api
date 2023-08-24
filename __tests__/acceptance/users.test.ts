import { AppDataSource } from "../../src/data-source";
import app from "../../src/app";
import { port } from "../../src/config";
import * as request from "supertest";

let connection, server;

const testUser = {
  firstName: "Lesino",
  lastName: "Moina",
  age: 29,
};

beforeEach(async () => {
  connection = await AppDataSource.initialize();
  await connection.synchronize(true);
  server = app.listen(port);
});

afterEach(() => {
  connection.close();
  server.close();
});

it("should be no users initially", async () => {
  const response = await request(app).get("/users");
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual([]);
});

it("should create a user", async () => {
  const response = await request(app).post("/users").send(testUser);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ ...testUser, id: 1 });
});

it("should not create a user if no first name is given", async () => {
  const response = await request(app)
    .post("/users")
    .send({ lastName: "Herman", age: 32 });
  expect(response.statusCode).toBe(400);
  expect(response.body.errors).not.toBeNull();
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0]).toEqual({
    type: "field",
    msg: "Invalid value",
    path: "firstName",
    location: "body",
  });
});

it("should not create a user if age is less than 0", async () => {
  const response = await request(app)
    .post("/users")
    .send({ firstName: "Joseph", lastName: "Herman", age: -32 });
  expect(response.statusCode).toBe(400);
  expect(response.body.errors).not.toBeNull();
  expect(response.body.errors.length).toBe(1);
  expect(response.body.errors[0]).toEqual({
    type: "field",
    value: -32,
    msg: "age must be a positive integer",
    path: "age",
    location: "body",
  });
});
