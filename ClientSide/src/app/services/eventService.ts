import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class EventService {

  constructor(private http: HTTP)
  {}

  getEvents() {
    return new Promise(resolve => {
      this.http.get('https://pvt73trafficinfo.herokuapp.com/api/events', {}, {})
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

        resolve(data.data);
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    });
  }
}
