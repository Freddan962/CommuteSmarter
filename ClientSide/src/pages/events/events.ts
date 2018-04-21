import { EventService } from './../../app/services/eventService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService) {
    this.items = eventService.getEvents();
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  itemSelected(item){
    console.log(item);
    item.accordionOpen = !item.accordionOpen;
  }
}
