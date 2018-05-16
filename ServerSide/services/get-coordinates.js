const httpMethods = require('./http.js');

const hostname = 'openparking.stockholm.se';

module.exports.populateCoordsTable = function(models, amount) {
    let populateDatabase = function(data) {
        
        let features = data.features;
        let coordinates = [];
        
        for(let i = 0; i < features.length; i++) {
          let coordinateData = {};

          let wrongWayAround =  features[i].geometry.coordinates[0];
          coordinateData['latitude'] = wrongWayAround[1];
          coordinateData['longitude'] = wrongWayAround[0];

          if (features[i].geometry.coordinates[1] != undefined) {
            wrongWayAround = features[i].geometry.coordinates[1];
            coordinateData['latitude_end'] = wrongWayAround[1];
            coordinateData['longitude_end'] = wrongWayAround[0];
          }

          coordinates.push(coordinateData);
        }        

       models.ValidCoordinates.bulkCreate(coordinates);
    }

    let request = '/LTF-Tolken/v1/ptillaten/all?outputFormat=json&maxFeatures=' + amount + '&apiKey=fc03a59a-04a6-4f07-8447-dd4634684d76'
    httpMethods.httpGetRequest(hostname, request, 443, populateDatabase);
}