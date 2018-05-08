function getRandomSensor(models, perform) {
    findRandomId(models.ValidCoordinates, perform);
}

function findRandomId(table, perform) {
    table.findAndCountAll({}).then((result) => {
        let count = result.count;
        let random = Math.floor(Math.random()*count);

        console.log("Antal " + count);
        console.log("Id: " + random);

        table.findById(random).then((sensor) => {
            perform(sensor);
        })
    });
}

function getRandomEventType(models, perform) {
    findRandomId(models.EventTypes, perform);
}

function getRandomEvent(models, perform) {
    getRandomSensor(models, (sensor => {
        getRandomEventType(models, (type => {
            let eventInfo = {
                color: type.color,
                location: '',
                lat: sensor.latitude,
                long: sensor.longitude,
                title: type.subtype,
                reported: new Date(),
                description: ''
            };
            models.Event.create(eventInfo).then(event => {
                perform(event);
            });
        }));
    }));
}

module.exports.getRandomEvent = getRandomEvent;

module.exports.doRandomEventCreation = function(models){
    const max = 10000;
    const min = 5000;
    do {
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(random);
        
        setInterval(function() {
            getRandomEvent(models, () => { 
                console.log("Called create random event!");
             })
        }, random);
    } while(true);
}