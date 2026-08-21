/*
 Import Supertest so we can send simulated HTTP requests.
*/
import request from 'supertest';

/*
 Import the running HTTP server from our application.
*/
import { app } from '../src/server.js';

describe('Sum demo tests', () => {
    describe('GET /sum', () => {
        it('should return the sum of two valid numbers', async () => {
            // Send GET /sum?a=5&b=3 and wait for the response.
            const response = await request(app)
                .get('/sum?a=5&b=3')
                .timeout(4000);

            // Verify that the request was successful.
            expect(response.status).toBe(200);

            // Verify that 5 + 3 equals 8.
            expect(response.body).toEqual({
                sum: 8
            });
        });

        it('should return an error if "a" or "b" is not a number', async () => {
            // Send an invalid value for "a".
            const response = await request(app)
                .get('/sum?a=invalid&b=3')
                .timeout(4000);

            // Invalid client input should return 400.
            expect(response.status).toBe(400);

            // Verify the exact error response.
            expect(response.body).toEqual({
                message:
                    'Invalid query parameters. Ensure "a" and "b" are numbers.'
            });
        });

        it('should return an error if "a" or "b" is missing', async () => {
            // Send only "a"; query parameter "b" is missing.
            const response = await request(app)
                .get('/sum?a=5')
                .timeout(4000);

            // Missing input should return 400.
            expect(response.status).toBe(400);

            // Verify the exact error response.
            expect(response.body).toEqual({
                message:
                    'Invalid query parameters. Ensure "a" and "b" are numbers.'
            });
        });
    });
});