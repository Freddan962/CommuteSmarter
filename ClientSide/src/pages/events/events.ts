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

  location: {
    latitude: number,
    longitude: number
  };

  private getEvents(){
    this.eventService.getEvents().subscribe(
      data => this.items = data,
      error => console.error('Error: ' + error),
      () => console.log('Done!')
    );
    
    
  }

  parseTime(time) {
    return moment(time).fromNow();
  }

  findUserLocation(){
    

    this.geolocation.getCurrentPosition().then
    ((position) => {
 
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.init(this.location);
 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  init(location){ 
    console.log(location);
  }

  distance(lat, long) {
    console.log('lat: '+ lat + ' long: '+ long);
    this.findUserLocation();
    console.log(this.location);
    let marker = new google.maps.LatLng(lat, long);
    let unit = 'km';
    let currentLocation;
    //let currentLocation = new google.maps.LatLng(59.326137, 18.071325); //endast för testning
    //let currentdistance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, marker); ///endast för testning
    let currentdistance;
   
    if(this.location != undefined){
      currentLocation = new google.maps.LatLng(this.location.latitude, this.location.longitude);
      currentdistance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, marker);
    }
    else{
      this.findUserLocation(); //kanske onödig?
    }
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
    }
    if (document.URL.startsWith('http')){
      this.navCtrl.push(EventsReportPage);
    } 
    else {
      this.navCtrl.push(MorePage);
    }
  }
}
