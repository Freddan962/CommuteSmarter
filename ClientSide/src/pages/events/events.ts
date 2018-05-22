import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Refresher, InfiniteScroll, LoadingController } from 'ionic-angular';
import { EventsReportPage } from '../eventsreport/eventsreport';
import { MorePage } from '../more/more';
import { EventService } from './../../app/services/eventService';
import { LoginWithTwitterService } from './../../app/services/loginWithTwitterService';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { Observable } from "rxjs/Rx"
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
  public items$: any;
  private chosenCategories: any;
  private refresher: Refresher
  private eventCount: number;
  private loading: any;
  private previous: any;
  private FETCH_EVENT_AMOUNT = 10
  private MAX_EVENT_AMOUNT = 50
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
    private settingService: SettingService,
    public loadingCtrl: LoadingController
  ){
      moment.locale(this.translate.currentLang);
      this.findUserLocation();
      this.items$ = new Array()
      this.eventCount = 0;
      
    /* Auto-fetch event every 10 second */
    // setInterval(()=> {
    //   this.refreshEvents(this.refresher )
    //   console.log("Refreshed eventss !")
    // }, 10000);
  }

  location: {
    latitude: number,
    longitude: number
  };


  //triggered when page open
  ionViewWillEnter() {
    if(this.items$.length < 1){
      this.presentLoading()
    }
    this.getDataFromServer()
   }


  refreshEvents(refresher){
    this.settingService.getCurrentFilters(filters => {
      
      this.chosenCategories = filters;
      
      //get events from database
      this.eventService.getLatest(this.chosenCategories, this.items$[0].reported, data => {
        if(data.length > 0){
          console.log('found '+ data.length+ ' new events!')
          for (let i = data.length-1; i >= 0; i--) {
          this.items$.unshift(data[i])
            if (this.items$.length > (this.MAX_EVENT_AMOUNT)) {
              this.items$.pop(data[data.length - 1])
              this.previous = this.items$[0].reported
            }
        }
      }else{
        console.log('already up-to-date')
      }
      this.previous = this.items$[0].reported
      if (refresher != 0 && refresher != undefined)
          refresher.complete();

    }); //Fetches from the database
  });
  }

  getDataFromServer(){
   
    this.items$ = []
    this.eventCount = 0
    //get current filter settings
    this.settingService.getCurrentFilters(filters => {
      this.chosenCategories = filters;
      
      //get events from database
      this.eventService.getEvents(this.chosenCategories, data => {
        this.dismissLoading()
        for (let i = this.eventCount; i < this.eventCount + this.FETCH_EVENT_AMOUNT; i++) {
          
          /* This could be used to remove events if the list gets too long */
        

          if (data.hasOwnProperty(i)) {
              this.items$.push(data[i]);
          }
          else{
            console.log('All events displayed!')
          }
        }
        this.eventCount = this.eventCount + this.FETCH_EVENT_AMOUNT
      }); //Fetches from the database
    });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    //get current filter settings
    this.settingService.getCurrentFilters(filters => {
      this.chosenCategories = filters;

      //get events from database
      this.eventService.getEvents(this.chosenCategories, data => {
        for (let i = this.eventCount; i < this.eventCount + this.FETCH_EVENT_AMOUNT; i++) {
          if (data.hasOwnProperty(i)) {
            this.items$.push(data[i])

            if (this.items$.length > this.MAX_EVENT_AMOUNT) {
              this.items$.shift()
              this.previous = this.items$[0].reported
            }
          }
          else {
            console.log('All events displayed!')
          }
          if (infiniteScroll != null) {
            infiniteScroll.complete()
            if (this.items$.length > 500)
              infiniteScroll.enable(false)
          }
        }
        console.log('removing items from start of event list')
        this.eventCount = this.eventCount + this.FETCH_EVENT_AMOUNT
      }); //Fetches from the database
    });

  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Getting events...'
    });
    this.loading.present();
  }
  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }




  //Attempt to catch ExpressionChangedAfterItHasBeenChecked
  parseTime(time) {
    return moment(time).fromNow() != null ? moment(time).fromNow() : ".. ago"
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
    if (/*this.isLoggedIn() || */document.URL.startsWith('http')) { //skip login on non-mobile since cordova doesnt work when not using mobile
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
    let response = this.http.sendDataToServer('events/' + item.id + '/mark-as-solved', {});
    response.subscribe();
  }

  openFilterPage(){
    this.navCtrl.push(filterMap);
  }

  getIconCategory(item){
    return './assets/imgs/' + item.category + '_' + item.color + '.png';
  }
}
