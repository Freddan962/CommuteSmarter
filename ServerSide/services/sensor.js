const google = require('@google/maps').createClient({
  key: 'AIzaSyBAuhoPibIl4c0OlG_dmOiWKn-bY49X0Rs',
  Promise: Promise
});

const push = require('./push-notifications.js');


function getRandomSensor(models, perform) {
    findRandomId(models.ValidCoordinates, perform);
}

function findRandomId(table, perform) {
    maxMin(table, (max, min) => {
        let random = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log("Max " + max);
        console.log("Min " + min);
        console.log("Id: " + random);

        table.findById(random).then((sensor) => {
            perform(sensor);
        })
    });
}

function maxMin(table, perform) {
    findMinId(table, (min)=>{
        findMaxId(table, (max)=> {
            perform(max, min)
        })
    });
}

function findMaxId(table, perform) {
    table.max('id').then((result) => {
        perform(result);
    });
}

function findMinId(table, perform) {
    table.min('id').then((result) => {
         perform(result);
    });
}

function getRandomEventType(models, perform) {
    findRandomId(models.EventTypes, perform);
}

function getRandomEventFromDb(models, perform) {
    findRandomId(models.Event, perform);
}

function getRandomEvent(models, perform) {
    getRandomSensor(models, (sensor => {

        getRandomEventType(models, (type => {
            google.reverseGeocode( {
                latlng: [sensor.latitude, sensor.longitude]
            })
            .asPromise()
            .then((response) => {
                console.log(response.json.results[0].formatted_address);
                let eventInfo = {
                    color: type.color,
                    location: response.json.results[0].formatted_address,
                    lat: sensor.latitude,
                    long: sensor.longitude,
                    category: type.subtype,
                    reported: new Date(),
                    description: ''
                };

                let rnd = Math.floor(Math.random() * 100) + 1;
                if (rnd > 30) {
                  eventInfo['lat_end'] = sensor.latitude_end;
                  eventInfo['long_end'] = sensor.longitude_end;
                }

                inDatabase(sensor.latitude, sensor.longitude, models, () => {
                    models.Event.create(eventInfo).then(event => {
                    perform(event);
                    });
                });

                models.PushSettings.find({ where: {
                  category: type.subtype + '_' + type.color,
                  status: 1
                }}).then( pushUsers => {
                  console.log(pushUsers);
                  console.log("HERE");
                });
            })
            .catch((err) => {
                console.log(err)
            });
        }));
    }));
}

function inDatabase(latitude, longitude, models, perform){
  models.Event.findOne({ where: { lat: latitude, long: longitude } }).then(
    ev => {
      if(ev == null || ev.length < 1) {
        perform();
      }
    })
}

function deleteRandomEvent(models) {
    getRandomEventFromDb(models,(event => {
        if(event !== null && event.description !== null && event.description == "") { //Will only delete events without description
            const min = 60 * 1000;
            if((new Date() - event.reported) > min) {
              console.log("------ RADERA ----------");
              console.log(event.id);
              console.log("------------------------");
              models.Event.destroy({
                  where: {
                      id: event.id
                  }
              })
            }
        }
    }))
}

module.exports.getRandomEvent = getRandomEvent;
module.exports.deleteRandomEvent = deleteRandomEvent;
