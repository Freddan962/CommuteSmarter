const twitter = require('./twitter.js');

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
      imageString: req.body.imageString,
      userId: req.body.userId
    };

    console.log(eventInfo);

    twitter.getIfLoggedIn(eventInfo.userId, models, ( loggedIn => {
      if(loggedIn) {
        models.Event.create(eventInfo).then(event => {
          res.status(201).json(event);
        }).catch(error => {
          res.status(400).send({ error: 'Bad request: ' + error.message });
        });
      } else {
        res.status(401).send({ error: 'The user must be logged in!' });
      }
    }));
  });

  app.get('/api/events', (req, res) => {
    const $gt = models.Sequelize.Op.gt;
    const $and = models.Sequelize.Op.and;
    const $or = models.Sequelize.Op.or;

    let categories = req.query.categories;
    let query = { order: [['reported', 'DESC']] };

    if(categories!== undefined && categories.length > 0) {
      categories = categories.split(',');
      console.log(categories);

      let filter = [];
      let colors = [];

      query['where'] = { [$or]: [] };

      for(let i = 0; i < categories.length; i++) {
        let current = categories[i];
        let seperator = current.indexOf('_');

        let category = current.slice(0, seperator);
        console.log(category);
        filter.push(category);


        let color = current.slice(seperator+1, current.length);
        console.log(color);
        colors.push(color);

        let obj = { [$and]: { 'category': category, 'color': color } };
        query['where'][$or].push(obj);
      }
    }

    let time = req.query.newerThan;

    if(time !== undefined && time.length > 0) {
      if(query.where === undefined) {
        query['where'] = { 'reported': { [$gt]: time } };
      } else {
        query.where['reported'] = { [$gt]: time };
      }
    }

    let latitude = req.query.lat;
    let longitude = req.query.long;

    if(latitude !== undefined && latitude.length > 0 &&
      longitude !== undefined && longitude.length > 0) {
      if(query.where === undefined) {
        query['where'] = { 'long': parseFloat(longitude), 'lat': parseFloat(latitude) };
      } else {
        query.where['long'] = parseFloat(longitude);
        query.where['lat'] = parseFloat(latitude);
      }
    }

    models.Event.findAll(query).then(events => {
      res.status(200).json(events);
    });
  });

  app.post('/api/events/:id/mark-as-solved', (req, res) => {
    models.Event.find({where: {id: req.params.id}}).then( event => {
      if(event) {
        if (event.solvedCount < 4) {
          event.updateAttributes({
            solvedCount: ++event.solvedCount
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
