const request = require('supertest');
const app = require('../app')
const models = require('../models');

const validEventData = {
  color: 'red',
  location: 'Olofs Väg 37',
  lat: 37,
  long: 37,
  title: 'Car crash at Olofs Väg 37',
  reported: '2018-04-27 09:30',
  description: 'Lorem Ipsum'
}

/***********/
/* ROUTES */
/**********/

describe('Test GET Events', () => {
  test('Should respond with HTTP status code 200', (done) => {
    request(app).get('/api/events').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Should respond with the correct amount of events', (done) => {
    models.Event.count().then(count => {
      request(app).get('/api/events').then((response) => {
        expect(response.body.length).toBe(count);
        done();
       });
    });
  });

  test('Should respond with status code 404 for request with non-existant event ID', (done) => {
    request(app).get('/api/events/377').then((response) => {
     expect(response.statusCode).toBe(404);
     done();
    });
  });
});

describe('Test POST events', () => {
  test('Should create a new event and respond with status code 201', (done) => {
    models.Event.count().then(initialCount => {
      request(app).post('/api/events').send(validEventData).then((response) => {
        expect(response.statusCode).toBe(201);
        models.Event.count().then(count => {
          expect(count).toBe(initialCount+1);        
          done();
        });
      });
    });
  });

  test('Should not create a new event if a post request contains invalid data', (done) => {
    let event = Object.assign({}, validEventData);
    event.lat = -900;

    models.Event.count().then(initialCount => {
      request(app).post('/api/events').send(event).then((response) => {
        expect(response.statusCode).toBe(400);
        models.Event.count().then(count => {
          expect(count).toBe(initialCount);        
          done();
        });
      });
    });
  });
});

/***********/
/* MODELS */
/**********/

describe('Test event creation', () => {
  /**********************/
  /*    INVALID TESTS   */
  /**********************/

  test('Should not accept accept a latitude value that is smaller than the boundary', (done) => {
    let event = Object.assign({}, validEventData);
    event.lat = -110;

    models.Event.create(event).catch((error) => {
      expect(error.message).toBe("Validation error: Latitude value can't be less than -90")
      done();
    });
  });

  test('Should not accept accept a latitude value that is greater than the boundary', (done) => {
    let event = Object.assign({}, validEventData);
    event.lat = 91;

    models.Event.create(event).catch((error) => {
      expect(error.message).toBe("Validation error: Latitude value can't be greather than 90");
      done();
    });
  });

  test('Should not accept accept a longitude value that is smaller than the boundary', (done) => {
    let event = Object.assign({}, validEventData);
    event.long = -181;

    models.Event.create(event).catch((error) => {
      expect(error.message).toBe("Validation error: Longitude value can't be less than -180");
      done();
    });
  });

  test('Should not accept accept a longitude value that is greater than the boundary', (done) => {
    let event = Object.assign({}, validEventData);
    event.long = 181;

    models.Event.create(event).catch((error) => {
      expect(error.message).toBe("Validation error: Longitude value can't be greather than 180");
      done();
    });
  });

  test('Should not allow creation with non-supported color', (done) => {
    let event = Object.assign({}, validEventData);
    event.color = 'purple';
    
    models.Event.create(event).catch((error) => {
      expect(error.message).toBe("Validation error: Invalid color");
      done();
    });
  });

  /**********************/
  /*    VALID TESTS     */
  /**********************/

  test('Should allow creation of objects with valid latitude and longitude values', (done) => {
    let event = Object.assign({}, validEventData);

    models.Event.create(event).then(event => {
      expect(event).toBeDefined();
      done();
    });
  });

  test('Should allow creation of events with orange color', (done) => {
    let event = Object.assign({}, validEventData);
    event.color = 'orange';

    models.Event.create(event).then(event => {
      expect(event).toBeDefined();
      done();
    });
  });

  test('Should allow creation of events with red color', (done) => {
    let event = Object.assign({}, validEventData);
    event.color = 'red';

    models.Event.create(event).then(event => {
      expect(event).toBeDefined();
      done();
    });
  });

  test('Should allow creation of events with blue color', (done) => {
    let event = Object.assign({}, validEventData);
    event.color = 'blue';

    models.Event.create(event).then(event => {
      expect(event).toBeDefined();
      done();
    });
  });
});
