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
            let eventInfo = {
                color: type.color,
                location: '',
                lat: sensor.latitude,
                long: sensor.longitude,
                category: type.subtype,
                reported: new Date(),
                description: ''
            };
            models.Event.create(eventInfo).then(event => {
                perform(event);
            });
        }));
    }));
}

function deleteRandomEvent(models) {
    getRandomEventFromDb(models,(event => {
        if(event !== null) {
            console.log("------ RADERA ----------");
            console.log(event.id);
            console.log("------------------------");
            models.Event.destroy({
                where: {
                    id: event.id
                }
            })
        }
    }))
}

module.exports.getRandomEvent = getRandomEvent;
module.exports.deleteRandomEvent = deleteRandomEvent;
