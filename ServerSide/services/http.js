const http = require('https');

let httpMethods = {
    httpGetRequest: function(hostname, path, port, callback) {
        return http.get({
            hostname: hostname,
            port: port,
            path: path,
            method: 'GET'
        }, function(result) {
            let body = '';

            result.on('data', function(data){
                body += data;
            });

            result.on('end', function() {
                callback(JSON.parse(body));
            });
        });
    },
    httpPostRequest: function(url, data, successCallback, errorCallback) {
      http.post(url, data).then(successCallback, errorCallback);
    }
}

module.exports = httpMethods;
