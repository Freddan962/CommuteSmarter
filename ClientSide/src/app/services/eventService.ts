import { Injectable } from '@angular/core';
import { HttpService } from './httpService';

@Injectable()
export class EventService {

  constructor(private httpService:HttpService)
  {}

  getEvents() {
    return this.httpService.getDataFromServer('events');
  }
}
