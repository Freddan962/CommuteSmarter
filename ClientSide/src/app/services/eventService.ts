import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  events: any;

  constructor() { 
    this.events = [
      {
        id: 1, 
        title: "Obstacle", 
        location: "Torsg/Norra Station", 
        time: "30 min ago", distance: 1.9, 
        description: "Car crash in intersection Torsgatan/Norra Stationsgatan. 3 cars involved, limited passability. Police has arrived at the scene."
      },
      {
        id: 2, 
        title: "Closed", 
        location: "Kungsg.", 
        time: "08.00-16.00", 
        distance: 2.7},
      {
        id: 3, 
        title: "Road Work", 
        location: "Odeng./Dalag.", 
        distance: 2.2
      },
      {
        id: 4, 
        title: "Traffic Jam", 
        location: "Sveavägen Odenplan", 
        distance: 5.7
      }
    ];
  }

  getEvents() {
    return this.events;
  }
} 