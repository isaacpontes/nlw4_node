import request from "supertest";
import { app } from "../app";
import createConnection from "../database";

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Example Survey",
            description: "This is an example survey."
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Example Survey 2",
            description: "This is another example survey."
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });

    it("Should not be able to create a new survey without a title", async () => {
        const response = await request(app).post("/surveys").send({
            description: "This is another example survey."
        });

        expect(response.status).toBe(400);
    });
});