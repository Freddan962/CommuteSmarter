import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsReportPage } from '../eventsreport/eventsreport';
import { MorePage } from '../more/more';
import { EventService } from './../../app/services/eventService';
import { LoginWithTwitterService } from './../../app/services/loginWithTwitterService';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
declare var google;

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {
  items: any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public eventService: EventService,
    public translate:TranslateService,
    private loginWithTwitterService:LoginWithTwitterService,
    private socialSharing: SocialSharing) {
       this.getEvents();
  }

  private getEvents(){
    this.eventService.getEvents().then(data => {
      this.items = data;
    });
  }

  parseTime(time) {
    return moment(time).fromNow();
  }

  getCurrentLocation(){
  let latLng : any;
  this.geolocation.getCurrentPosition().then
      ((position) => {
        let latLng = new google.maps.LatLng
          (position.coords.latitude, position.coords.longitude);
        }, (err) => {
          console.log(err);
        });
        return latLng;
      }

  distance(lat, long) {
    let currentLocation = new google.maps.LatLng(this.getCurrentLocation());
    let marker = new google.maps.LatLng(lat, long);
    let unit = 'km';

    let currentdistance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, marker);

    if(currentdistance < 1000) {
      unit = 'm';
    } else {
      currentdistance = currentdistance / 1000;
    }

    return currentdistance.toFixed(2) + ' ' + unit;
  }

  itemSelected(item){
    console.log(item);
    item.accordionOpen = !item.accordionOpen;
  }

  shareEvent(item) {
    console.log('called share event');

    this.socialSharing.share(item.title, item.text, null, null);
  }

  private isLoggedIn() {
    return this.loginWithTwitterService.getIfSignedIn();
  }

  openReportPage() {
    if(this.isLoggedIn()) {
      this.navCtrl.push(EventsReportPage);
    } else {
      this.navCtrl.push(MorePage);
    }
  }
}
