import request from 'supertest';
import { httpServer } from '../src/server.js';

describe('Concat tests', () => {
    /*
     Close the HTTP server after all tests finish.

     This releases port 8000 and allows Jest to exit.
    */
    afterAll((done) => {
        httpServer.close(done);
    });

    describe('GET /concat', () => {
        it('should return the concatenation of two strings', async () => {
            /*
             Sends:
             GET /concat?str1=Hello&str2=World
            */
            const response = await request(httpServer)
                .get('/concat')
                .query({
                    str1: 'Hello',
                    str2: 'World'
                })
                .timeout(4000);

            // Verify the successful HTTP status.
            expect(response.status).toBe(200);

            // 'Hello' + 'World' should produce 'HelloWorld'.
            expect(response.body).toEqual({
                result: 'HelloWorld'
            });
        });

        it('should concatenate numbers as strings', async () => {
            /*
             Query parameters are received as strings.

             '12' + '34' produces '1234', not 46.
            */
            const response = await request(httpServer)
                .get('/concat')
                .query({
                    str1: 12,
                    str2: 34
                })
                .timeout(4000);

            expect(response.status).toBe(200);

            expect(response.body).toEqual({
                result: '1234'
            });
        });

        it('should return an error if "str1" or "str2" is missing', async () => {
            /*
             Only str1 is sent.
             str2 will be undefined in the route.
            */
            const response = await request(httpServer)
                .get('/concat')
                .query({
                    str1: 'Hello'
                })
                .timeout(4000);

            // Missing required input should return 400.
            expect(response.status).toBe(400);

            expect(response.body).toEqual({
                message:
                    'Invalid query parameters. Ensure "str1" and "str2" are provided.'
            });
        });
    });
});