module.exports = function(app, models) {
  app.post('/api/events', function (req, res) {
    let eventInfo = {
      color: req.body.color,
      location: req.body.location,
      lat: req.body.lat,
      long: req.body.long,
      category: req.body.category,
      reported: req.body.reported,
      description: req.body.description,
      imageString: req.body.imageString
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

  app.post('/api/events/:id/mark-as-solved', (req, res) => {
    models.Event.find({where: {id: req.param.id}}).then( event => {
      if(event) {
        if (event.solvedCount < 5) {
          event.updateAttributes({
            solvedCount: event.solvedCount++
          }).then(() => {
            res.status(200).json({status: 200, message: 'Successfully voted to close the event!'});
          })
        } else {
          models.Event.destroy({
            where: {
              id: event.id
            }
          })
        }
      }
    });
  });

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
