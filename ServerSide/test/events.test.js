
it('adds 1 + 2 to equal 3', () => {
    const sum = require('../routes/events');
    expect(sum(1, 2)).toBe(3);
});