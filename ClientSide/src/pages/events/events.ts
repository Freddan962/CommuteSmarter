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
import { Observable } from "rxjs/Rx"

declare const google;


@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {

  public items$: Observable<any>
  items: any;

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public eventService: EventService,
    public translate:TranslateService,
    private loginWithTwitterService:LoginWithTwitterService,
    private socialSharing: SocialSharing) {  
  }

  location: {
    latitude: number,
    longitude: number
  };

  public ngOnInit() {
    this.items$ = this.eventService.getEvents();
    console.log('Server responded with: \n'+ JSON.stringify(this.items$))
  }

  // private getEvents(){
  //   console.log('initiated!')
    
  //   this.eventService.getEvents().subscribe(
  //     data => {
  //       this.items = data,
  //       this.disactivate()
  //     }),
  //     error => console.error('Error: ' + error),
  //     () => console.log("Hello!");    
  // }



  parseTime(time) {
    moment.locale(this.translate.currentLang);
    return moment(time).fromNow();
  }

  findUserLocation(){
    this.geolocation.getCurrentPosition().then
    ((position) => {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }; 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  distance(lat, long) {
    this.findUserLocation();
    let marker = new google.maps.LatLng(lat, long);
    let unit = 'km';
    let currentLocation;
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
    if (this.isLoggedIn() || 
        document.URL.startsWith('http')) { //skip login on non-mobile since cordova doesnt work when not using mobile
      this.navCtrl.push(EventsReportPage);
    }
    else {
      this.navCtrl.push(MorePage);
    }
  }

  markAsFinished(item){
    //remove finished item?
  }
}
