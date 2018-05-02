const request = require('supertest');
const app = require('../app')

describe('Test GET Events', () => {
    test('Should repspond with HTTP status code 200', (done) => {
        request(app).get('/api/events').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

/*it('adds 1 + 2 to equal 3', () => {
    const sum = require('../routes/events');
    expect(sum(1, 2)).toBe(3);
});*/
