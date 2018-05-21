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
}
