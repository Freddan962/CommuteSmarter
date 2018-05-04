const httpMethods = require('./http.js');

const hostname = 'openparking.stockholm.se';
const request = '/LTF-Tolken/v1/ptillaten/all?outputFormat=json&maxFeatures=4500&apiKey=fc03a59a-04a6-4f07-8447-dd4634684d76'

module.exports = function(app, models) {
    let populateDatabase = function(data) {
        console.log(data);
    }
    
    let result = httpMethods.httpGetRequest(hostname, request, 443, populateDatabase);
    models.ValidCoordinates.create(result.features, { fields: ['geometry.coordinates'] }).then(() => {
        console.log("run");
    });
}