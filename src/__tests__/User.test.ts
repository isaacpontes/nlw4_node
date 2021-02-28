import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "Example",
            email: "example@email.com"
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new user with already used email", async () => {
        const response = await request(app).post("/users").send({
            name: "Example",
            email: "example@email.com"
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new user without an email", async () => {
        const response = await request(app).post("/users").send({
            name: "Example"
        });

        expect(response.status).toBe(400);
    });
})