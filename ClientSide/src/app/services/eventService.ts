import { Injectable } from '@angular/core';
import { HttpService } from './httpService';

@Injectable()
export class EventService {

  constructor(
    private httpService:HttpService,
  )
  {}

  getEvents(categories, perform) {
    this.httpService.getDataFromServer('events?categories='+categories).subscribe(data => {
      perform(data);
    });
  }

  getLatest(categories, id, perform) {
    console.log("LATEST:");
    console.log(categories);
    console.log(id);
    if(categories !== null) {
      this.httpService.getDataFromServer('events?categories='+categories + '&higherThanEventId=' + id).subscribe(data => {
        console.log(data);
        perform(data);
      });
    } else {
      perform([]);
    }
  }

  getEventById(id, perform) {
    this.httpService.getDataFromServer('events/' + id).subscribe(data => {
      perform(data);
    });
  }
}
