import { MapCategoryHelper } from './../../classes/MapCategoryHelper';
import { DrawableFactory } from './../../classes/DrawableFactory';
import { SettingService } from './../../app/services/settingService';
import { MorePage } from './../more/more';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { filterMap } from '../filterMap/filterMap';
import { ChangeDetectorRef } from '@angular/core';  //https://stackoverflow.com/questions/40759808/angular-2-ngif-not-refreshing-when-variable-update-from-oberservable-subscrib
import { SocialSharing } from '@ionic-native/social-sharing';
import moment from 'moment';
import { EventService } from './../../app/services/eventService';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Rx"
import { HttpService } from './../../app/services/httpService';
import { LoginWithTwitterService } from './../../app/services/loginWithTwitterService';
import { EventsReportPage } from '../eventsreport/eventsreport';
import { MapProcessor } from '../../classes/MapProcessor';

declare var google;
var locationMarker;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  // Target the dom element
  @ViewChild('map') mapElement: ElementRef;
  navController: NavController;

  map: any;
  displayMapEventCard: boolean;
  animateEventCard: string;
  mapEventInfo: any;
  colors: any;
  obstacles: any;
  currentPosition: any;
  chosenCategories: any;

  processor: MapProcessor = new MapProcessor(this);
 
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private socialSharing: SocialSharing,
    private cdRef: ChangeDetectorRef,
    private eventService: EventService,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private http: HttpService,
    private twitter: LoginWithTwitterService,
    private settingService: SettingService
  ) {
    moment.locale(this.translate.currentLang);

    this.displayMapEventCard = false;
    this.animateEventCard = 'reveal';

    this.colors = {
      'orange': '#ffa500',
      'red': '#ff0000',
      'blue': '#0000ff'
    }
  }

  refreshEvents(perform) {
    this.settingService.getCurrentFilters( filters => {
      this.eventService.getEvents(filters, data => {
        this.chosenCategories = filters;

        if (this.chosenCategories.length == 0) {
          this.filterOnMap();
          return;
        }

        this.obstacles = data;
        this.processor.loadEventsIntoQueue(data);
        this.filterOnMap();
        
        perform();
      });
   });
  }

  // Runs only once and is cached
  ionViewDidLoad() {
    this.loadMap();
  }

  // Runs on every view enter
  ionViewWillEnter() {
    this.doRefreshEvents();
  }

  // Refresh the events and render events
  doRefreshEvents() {
    this.refreshEvents(() => {
      
    });
  }

  filterOnMap() {
    //this.clearDrawablesFromMap(this.markerStore);
    //this.clearDrawablesFromMap(this.lineStore);
  }

  /*clearDrawablesFromMap(drawables) {
    let helper = new MapCategoryHelper();
    let categories = helper.getCategoriesToRemove(this.chosenCategories, this.processor.drawableFactory.getMarkerStore());

    categories.forEach(category => {
      if (drawables[category] == undefined)
        return;

      for (let i = 0; i < drawables[category].length; i++) {
        drawables[category][i].setMap(null);
        drawables[category].splice(i, 0);
      }
    })
  }*/

  /**
   * loadMap()
   *
   * Responsible for creating the initial map.
   *
   * @memberof MapPage
   */
  loadMap() {
    let latLng = new google.maps.LatLng(59.326137, 18.071325);

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      clickableIcons: false
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.centerMapToLocation();
  }

  onClicked(){
    this.navCtrl.push(filterMap);
  }

  /**
   * centerMapToLocation()
   *
   * Prepares the center marker and centers the map on current geolocation.
   *
   * @memberof MapPage
   */
  centerMapToLocation() {
    this.geolocation.getCurrentPosition().then
      ((position) => {
        let latLng = new google.maps.LatLng
          (position.coords.latitude, position.coords.longitude);

        this.currentPosition = latLng;

        if(locationMarker == null) {
          locationMarker = this.processor.drawableFactory.createMarker('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.currentPosition);
        }
        locationMarker.setZIndex(100);
      }, (err) => {
        console.log(err);
      });
	}

  /**
   * openMapEventinfo()
   *
   * Reveals the display box displaying the provided data.
   *
   * @param {any} data The data to be displayed in the box.
   * @memberof MapPage
   */
  openMapEventInfo(data) {
    this.mapEventInfo = data;
    this.displayMapEventCard = true;
    this.cdRef.detectChanges();
  }

  /**
  * shareEvent()
  *
  * Callback function for the shareEvent button on the event
  * details modal.
  *
  * @memberof MapPage
  */
  shareEvent() {
    this.socialSharing.share(
      this.translate.instant('Settings.' + this.mapEventInfo.category) + ' ' +  this.mapEventInfo.location,
      this.mapEventInfo.description
    );
  }

  /**
   * closeMapEventInfo()
   *
   * Closes the box with information regarding a specific event.
   *
   * @memberof MapPage
   */
  closeMapEventInfo() {
    this.animateEventCard = 'fadeAway';
    this.cdRef.detectChanges();

    setTimeout(() => {
      this.displayMapEventCard = false;
      this.cdRef.detectChanges();

      this.animateEventCard = 'reveal';
    }, 1000);
  }

  
  /**
   * drawIcon()
   *
   * Renders a icon at the specified position using the provided color and
   * prepares callbacks to deal with display of data.
   *
   * @param {any} pos The position where the marker is placed.
   * @param {any} color The target color of the marker.
   * @param {any} data The data that gets displayed in the reaveled box.
   * @memberof MapPage
   */
  drawIcon(pos, color, data) {
    //this.addInfoMarker('./assets/imgs/' + color + '.png', pos, data);
  }

  /**
   * Used to display a prettified reported time.
   */
  parseTime(time) {
    return moment(time).fromNow();
  }

  /**
   * Calculate the distance to an event from current location.
   */
  distance(lat, long) {
    let unit = 'km';
    let currentLocation;
    let currentdistance;
    let poi = new google.maps.LatLng(lat, long);
    if(this.currentPosition != undefined) {
      currentLocation = this.currentPosition;

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

  openReportPage() {
    if (this.twitter.getIfSignedIn() || document.URL.startsWith('http')) { //skip login on non-mobile since cordova doesnt work when not using mobile
      this.navCtrl.push(EventsReportPage);
    } else {
      this.navCtrl.push(MorePage);
    }
  }
}
