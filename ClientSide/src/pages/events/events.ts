import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventsReportPage } from '../eventsreport/eventsreport';
import { MorePage } from '../more/more';
import { EventService } from './../../app/services/eventService';
import { LoginWithTwitterService } from './../../app/services/loginWithTwitterService';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Observable } from "rxjs/Rx"
import { HttpService } from './../../app/services/httpService';
import { SettingService } from '../../app/services/settingService';
import { filterMap } from '../filterMap/filterMap';

declare const google;

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {
  public items$: Observable<any>;
  private chosenCategories: any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public navParams: NavParams,
    public eventService: EventService,
    public translate:TranslateService,
    private loginWithTwitterService:LoginWithTwitterService,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    private http: HttpService,
    private settingService: SettingService
  ){
      moment.locale(this.translate.currentLang);
      this.findUserLocation();
      this.refreshEvents();
  }

  location: {
    latitude: number,
    longitude: number
  };

  refreshEvents(){
    this.settingService.getCurrentFilters( filters => {
      console.log(filters)
      this.chosenCategories = filters;

      this.items$ = this.eventService.getEvents(this.chosenCategories); //Fetches from the database
      console.log('Server responded with:')
      console.log(this.items$)
   });
  }

  parseTime(time) {
    return moment(time).fromNow();
  }

  findUserLocation(){
    this.geolocation.getCurrentPosition().then((position) => {
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  distance(lat, long) {
    let unit = 'km';
    let currentLocation;
    let currentdistance;
    let poi = new google.maps.LatLng(lat, long);
    if(this.location != undefined) {
      currentLocation = new google.maps.LatLng(this.location.latitude, this.location.longitude);
      currentdistance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, poi);

      if(currentdistance < 1000) {
        unit = 'm';
      } else {
        currentdistance = currentdistance / 1000;
      }

      return currentdistance.toFixed(2) + ' ' + unit;
    } else {
      return "";
    }
  }

  itemSelected(item){
    console.log(item);
    item.accordionOpen = !item.accordionOpen;
  }

  shareEvent(item) {
    console.log('called share event');
    this.socialSharing.share(
      this.translate.instant('Settings.' + item.category) + ' ' + item.location,
      item.description
    );
  }

  private isLoggedIn() {
    return this.loginWithTwitterService.getIfSignedIn();
  }

  openReportPage() {
    if (this.isLoggedIn() || document.URL.startsWith('http')) { //skip login on non-mobile since cordova doesnt work when not using mobile
      this.navCtrl.push(EventsReportPage);
    } else {
      this.navCtrl.push(MorePage);
    }
  }

  markAsFinished(item){
    // Alert modal to confirm
    let confirm = this.alertCtrl.create({
      title: this.translate.instant('EventReport.confirmReport'),
      message:
        `<p>${this.translate.instant('EventReport.reportAsSolved')}<\p>
        <p>${this.translate.instant('Settings.'+item.category)} ${this.translate.instant('EventReport.at')} ${item.location}.<p>
      `,
      buttons: [
        {
          text: this.translate.instant('EventReport.cancel'),
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('EventReport.send'),
          handler: () => {
            this.sendSolved(item);
            console.log('Send clicked');
          }
        }
      ],

    });

    confirm.present();
  }

  sendSolved(item){
    this.http.sendDataToServer('events/' + item.id + '/mark-as-solved', {});
  }

  openFilterPage(){
    this.navCtrl.push(filterMap);
  }
}
