import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { SettingService } from './settingService';

@Injectable()
export class EventService {

  constructor(
    private httpService:HttpService,
    private settings:SettingService
  )
  {}

  getEvents(categories, perform) {
    this.httpService.getDataFromServer('events?categories='+categories).subscribe(data => {
      perform(data);
    });
  }

  getLatest(categories, previous, perform) {
    this.httpService.getDataFromServer('events?categories='+categories + '&newerThan=' + previous).subscribe(data => {
      console.log(data);
      // this.events = data;

      perform(data);
    });
  }

  getEventById(id, perform) {
    this.httpService.getDataFromServer('events/' + id).subscribe(data => {
      console.log(data);
      // this.events = data;

      perform(data);
    });
  }
}
