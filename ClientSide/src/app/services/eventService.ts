import { Injectable } from '@angular/core';
import { HttpService } from './httpService';

@Injectable()
export class EventService {

  constructor(private httpService:HttpService)
  {}

  getEvents(categories) {
    return this.httpService.getDataFromServer('events');
  }
}
