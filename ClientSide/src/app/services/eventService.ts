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
    this.httpService.getDataFromServer('events?categories='+categories + '&higherThanEventId=' + id).subscribe(data => {
      perform(data);
    });
  }

  getEventById(id, perform) {
    this.httpService.getDataFromServer('events/' + id).subscribe(data => {
      perform(data);
    });
  }
}
