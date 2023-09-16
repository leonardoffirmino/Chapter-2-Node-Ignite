import { app } from "@shared/infra/http/app";
import request from "supertest";




describe("Create Category Controller", async () => {
  it("Test", async () => {
    await request(app).get("/cars/available").expect(200);
  });
});