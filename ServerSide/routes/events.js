module.exports = function(app, models) {
  app.post('/api/events', function (req, res) {
    let eventInfo = {
      color: req.body.color,
      location: req.body.location,
      lat: req.body.lat,
      long: req.body.long,
      title: req.body.title,
      reported: req.body.reported,
      description: req.body.description
    };

    models.Event.create(eventInfo).then(event => {
      res.json(event);
    });
  });

  app.get('/api/events', (req, res) => {
    models.Event.findAll().then(events => {
      res.json(events);
    });
  });

  app.get('/api/events/:id', (req, res) => {
    models.Event.findById(parseInt(req.params.id)).then(event => {
      if (!event) {
        res.status(404).send('The event with the provided ID was not found');
        return;
      }

      res.json(event);
    });
  });
};
