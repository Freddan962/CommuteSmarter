import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { SettingService } from './settingService';

@Injectable()
export class EventService {

  private events: any;
  private currentFilter: any;

  constructor(
    private httpService:HttpService,
    private settings:SettingService
  )
  {}

  getEvents(categories, perform) {
    this.httpService.getDataFromServer('events?categories='+categories).subscribe(data => {
      console.log(data);
      this.events = data;

      perform(data);
    });
  }

  getLatest(categories, previous, perform) {
    this.httpService.getDataFromServer('events?categories='+categories + '&newerThan=' + previous).subscribe(data => {
      console.log(data);
      this.events = data;

      perform(data);
    });
  }
}
