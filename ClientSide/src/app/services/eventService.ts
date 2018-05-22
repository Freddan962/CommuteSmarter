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

  getLatest(categories, previous, perform) {
    this.httpService.getDataFromServer('events?categories='+categories + '&newerThan=' + previous).subscribe(data => {
      perform(data);
    });
  }

  getEventById(id, perform) {
    this.httpService.getDataFromServer('events/' + id).subscribe(data => {
      perform(data);
    });
  }
}
