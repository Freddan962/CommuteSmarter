const httpMethods = require('./http.js');
const Sequelize = require('sequelize');

const hostname = 'openparking.stockholm.se';

module.exports.populateCoordsTable = function(app, models, amount) {
    let populateDatabase = function(data) {
        
        let features = data.features;
        let coordinates = [];
        
        for(let i = 0; i < features.length; i++) {
           let wrongWayAround =  features[i].geometry.coordinates[0];
           coordinates.push({ latitude: wrongWayAround[1], longitude: wrongWayAround[0]});
        }        

       models.ValidCoordinates.bulkCreate(coordinates).then(() => {
            console.log("run");
        });
    }

    let request = '/LTF-Tolken/v1/ptillaten/all?outputFormat=json&maxFeatures=' + amount + '&apiKey=fc03a59a-04a6-4f07-8447-dd4634684d76'
    httpMethods.httpGetRequest(hostname, request, 443, populateDatabase);
}