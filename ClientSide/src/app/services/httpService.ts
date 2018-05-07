import { Injectable } from '@angular/core';
//import { HTTP } from '@ionic-native/http'; //fungerar inte i browser
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private http: Http)
  {}

  getDataFromServer(route) {
    
    return this.http.get('https://pvt73trafficinfo.herokuapp.com/api/' + route)
      .map(response => response.json());

 
    /*  return new Promise(resolve => {
      this.http.get('https://pvt73trafficinfo.herokuapp.com/api/' + route, {}, {})
      .then((data: any) => {
        resolve(JSON.parse(data.data));
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    });*/
  }
  getDataFromExternal(link) {

    return this.http.get(link)
      .map(response => response.json());
  
    /*
    return new Promise(resolve => {
      this.http.get(link, {}, {})
      .then((data: any) => {
        resolve(JSON.parse(data.data));
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    });*/
  }
}
