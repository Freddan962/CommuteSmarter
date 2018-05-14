module.exports = function(app, models) {
  app.post('/api/events', function (req, res) {
    let eventInfo = {
      color: req.body.color,
      location: req.body.location,
      lat: req.body.lat,
      long: req.body.long,
      category: req.body.category,
      reported: req.body.reported,
      description: req.body.description
    };

    models.Event.create(eventInfo).then(event => {
      res.status(201).json(event);
    }).catch(error => {
      res.status(400).send({ error: 'Bad request: ' + error.message });
    });
  });

  app.get('/api/events', (req, res) => {
    models.Event.findAll({order: [['reported', 'DESC']]}).then(events => {
      res.status(200).json(events);
    });
  });

  app.post('/api/events/:id/marked-as-solved', (req, res) => {
    models.Event.find({where: {id: req.param.id}})
    .on('success', function(event) {
      if(event) {
        event.updateAttributes({
          solvedCount: event.solvedCount++
        }).success(function(){
          res.status(200).json({status: 200, message: 'Successfully voted to close the event!'});
      })
    }
  })

  app.get('/api/events/:id', (req, res) => {
    models.Event.findById(parseInt(req.params.id)).then(event => {
      if (event == null) {
        res.status(404).send('The event with the ID' + req.params.id + 'was not found');
        return;
      }

      res.status(200).json(event);
    });
  });
};
