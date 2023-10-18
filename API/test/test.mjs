import request from "supertest";
import { expect } from "expect";

import app from "../index.mjs";

describe("Testing POSTS/teams endpoint", () => {
    it("Successful Request", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Sacramento Kings", team2: "Golden State Warriors", year: "2023"})
        
        expect(response.status).toBe(200);
    })
    it("Respond with error for missing team1", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team2: "Golden State Warriors", year: "2022"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "msg": "team1 required",
                    "path": "team1",
                    "location": "body"
                },
                {
                    "type": "field",
                    "msg": "Team1 name is not valid",
                    "path": "team1",
                    "location": "body"
                },
                {
                    "type": "field",
                    "msg": "team1 must be a string",
                    "path": "team1",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for team1 not being a string", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: 333, team2: "Golden State Warriors", year: "2022"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "value": 333,
                    "msg": "Team1 name is not valid",
                    "path": "team1",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": 333,
                    "msg": "team1 must be a string",
                    "path": "team1",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for team1 not being a team", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Sacramento King", team2: "Golden State Warriors", year: "2022"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "value": "Sacramento King",
                    "msg": "Team1 name is not valid",
                    "path": "team1",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for missing team2", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Golden State Warriors", year: "2022"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "msg": "team2 required",
                    "path": "team2",
                    "location": "body"
                },
                {
                    "type": "field",
                    "msg": "Team2 name is not valid",
                    "path": "team2",
                    "location": "body"
                },
                {
                    "type": "field",
                    "msg": "team2 must be a string",
                    "path": "team2",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for team1 not being a string", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Golden State Warriors", team2: 333, year: "2022"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "value": 333,
                    "msg": "Team2 name is not valid",
                    "path": "team2",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": 333,
                    "msg": "team2 must be a string",
                    "path": "team2",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for team2 not being a team", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Sacramento Kings", team2: "Golden State Warrior", year: "2022"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "value": "Golden State Warrior",
                    "msg": "Team2 name is not valid",
                    "path": "team2",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for missing year", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Sacramento Kings", team2: "Golden State Warriors"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "msg": "year required",
                    "path": "year",
                    "location": "body"
                },
                {
                    "type": "field",
                    "msg": "year must be a string",
                    "path": "year",
                    "location": "body"
                },
                {
                    "type": "field",
                    "msg": "year is not within range",
                    "path": "year",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for year not being a string", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Sacramento Kings", team2: "Golden State Warriors", year: 2022})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "value": 2022,
                    "msg": "year must be a string",
                    "path": "year",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
    it("Respond with error for year not being in range", async () => {
        const response = await request(app)
            .post('/teams')
            .send({ team1: "Sacramento Kings", team2: "Golden State Warriors", year: "2018"})
        
        let responseBody = {
            "success": false,
            "errors": [
                {
                    "type": "field",
                    "value": "2018",
                    "msg": "year is not within range",
                    "path": "year",
                    "location": "body"
                }
            ]
        }
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual(responseBody);
    })
})