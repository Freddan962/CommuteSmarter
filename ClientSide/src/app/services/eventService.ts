import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class EventService {

  events: any;

  constructor(private http: HTTP)
  {
    this.http.get('https://pvt73trafficinfo.herokuapp.com/events', {}, {})
    .then(data => {
      this.events = data;
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }

  getEvents() {
    return this.events;
  }
}
