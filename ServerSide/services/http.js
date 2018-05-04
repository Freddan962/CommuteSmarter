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
                console.log(body);
                
                callback(JSON.parse(body));
            }); 
        });
    }
}

module.exports = httpMethods;