const request = require('supertest');
const app = require('../app')

//Just for now reposn with 500, change later
describe('Test GET Twitter', () => {
    test('Should repspond with HTTP status code 500', (done) => {
        request(app).get('/api/twitter').then((response) => {
            expect(response.statusCode).toBe(500);
            done();
        });
    });
});
