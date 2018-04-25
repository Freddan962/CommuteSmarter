import { EventService } from './../../app/services/eventService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsReportPage } from '../eventsreport/eventsreport';

import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public eventService: EventService, private socialSharing: SocialSharing) {
       this.getEvents();
  }

  private getEvents(){
    this.eventService.getEvents().then(data => {
      this.items = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  itemSelected(item){
    console.log(item);
    item.accordionOpen = !item.accordionOpen;
  }

  shareEvent(item) {
    console.log("called share event");

    this.socialSharing.share(item.title, item.text, null, null);
  }

  //Use this code to link events-page with events-report page
  // openReportPage() {
  //   this.navCtrl.push(EventsReportPage);
  // }
}
