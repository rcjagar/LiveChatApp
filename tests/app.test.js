import request from 'supertest';
import { app } from '../src/server.js';

describe('Application routes', () => {
    it('should return the welcome message from GET /', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('hello world');
        expect(response.type).toBe('text/plain');
    });

    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/does-not-exist');

        expect(response.status).toBe(404);
        expect(response.text).toBe('this route is not available');
        expect(response.type).toBe('text/plain');
    });
});