import { EventService } from './../../app/services/eventService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsReportPage } from '../eventsreport/eventsreport';
import moment from 'moment';

import { SocialSharing } from '@ionic-native/social-sharing';
declare var google;

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
    console.log('called share event');

    this.socialSharing.share(item.title, item.text, null, null);
  }

  parseTime(time) {
    return moment(time).fromNow();
  }

  distance() {
    let currentLocation = new google.maps.LatLng(59.405539, 17.942470);
    let marker = new google.maps.LatLng(65.405539, 17.942470);
    let unit = 'km';

    let currentdistance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, marker);

    if(currentdistance < 1000) {
      unit = 'm';
    } else {
      currentdistance = currentdistance / 1000;
    }

    return currentdistance.toFixed(2) + ' ' + unit;
  }

  //Use this code to link events-page with events-report page
  // openReportPage() {
  //   this.navCtrl.push(EventsReportPage);
  // }
}
