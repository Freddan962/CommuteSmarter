module.exports = function(app, db) {
  app.post('/twitter-account', (request, result) => {
    result.send('Hello');
  });
};
