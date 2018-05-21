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
import { DomSanitizer } from '@angular/platform-browser';


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
  private hideFAB: boolean;
  map: any;
  displayMapEventCard: boolean;
  animateEventCard: string;
  mapEventInfo: any;
  colors: any;
  obstacles: any;
  currentPosition: any;
  chosenCategories: any;
  public eventImage: string;


  markerStore: any = [];
 
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
    private settingService: SettingService,
    private DomSanitizer: DomSanitizer
  ) {
    moment.locale(this.translate.currentLang);

    this.displayMapEventCard = false;
    this.animateEventCard = 'reveal';
    this.hideFAB = false;

    this.eventImage = 'data:image/gif;base64,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'

    this.colors = {
      'orange': '#ffa500',
      'red': '#ff0000',
      'blue': '#0000ff'
    }
  }

  refreshEvents(perform) {
    this.settingService.getCurrentFilters( filters => {
      this.eventService.getEvents(filters, data => {
        console.log(filters)
        this.chosenCategories = filters;

        this.obstacles = data;
        this.clearMarkersByCategory();
        
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
      this.renderObstacles();
    });
  }

  clearMarkersByCategory() : void {    
    if (this.chosenCategories == undefined)
      return;

    Object.keys(this.markerStore).forEach(category => {
      if (this.chosenCategories.includes(category))
        return;

      for (let i = 0; i < this.markerStore[category].length; i++) {
        this.markerStore[category][i].setMap(null);
        this.markerStore[category].splice(i, 0);
      }
    });
  }

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

  /**
   * renderObstacles()
   *
   * Handles and renders obstacles on the map.
   *
   * @memberof MapPage
   */
  renderObstacles() {
    this.obstacles.forEach(obstacle => {
        let type = obstacle.type;

        if(type === undefined) {
          type = '';
        }

        if (obstacle.lat_end == -100 || obstacle.lng_end == -100) {
          this.drawIcon(new google.maps.LatLng(obstacle.lat, obstacle.long), (obstacle.category + '_' + obstacle.color), obstacle);
        }
        else {
          let start = new google.maps.LatLng(obstacle.lat, obstacle.long);
          let end = new google.maps.LatLng(obstacle.lat_end, obstacle.long_end)
          this.drawPath(start, end, obstacle.color, obstacle);
        }
      });
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
        this.map.setCenter(latLng);

        // save current location to a class var
        this.currentPosition = latLng;

        if(locationMarker == null) {
          locationMarker = this.addMarker('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.map.getCenter());
        }
        locationMarker.setPosition(latLng);
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
    // this.FABdisabled()
    this.hideFAB = !this.hideFAB
    this.mapEventInfo = data;
    this.displayMapEventCard = true;
    this.cdRef.detectChanges();
  }


  /**
  * FABdisabled()
  *
  * Changes animation of report-page Floating Action Button when it enables/disables 
  *
  * @memberof MapPage
  * @returns String
  */
  FABdisabled(){
    return (this.hideFAB == false) ? 'reveal' : 'fadeAway'
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
    this.hideFAB = !this.hideFAB
    this.animateEventCard = 'fadeAway';
    this.cdRef.detectChanges();

    setTimeout(() => {
      this.displayMapEventCard = false;
      this.cdRef.detectChanges();

      this.animateEventCard = 'reveal';
    }, 1000);
  }

  /**
   * addMarker()
   *
   * Adds a marker to the map.
   *
   * @param {any} markerImage The image of the marker.
   * @param {any} position The position of the marker.
   * @returns
   * @memberof MapPage
   */
  addMarker(markerImage, position) {
    let marker = new google.maps.Marker({
      map: this.map,
      icon:
      new google.maps.MarkerImage(
        markerImage,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(25, 25) /* marker size */
      ),
      position: position
    });

    return marker;
  }

  /**
  * addInfoMarker()
  *
  * Adds a info markeron the map.
  *
  * @param {any} markerImage The image to be displayed.
  * @param {any} position The position of the marker.
  * @param {any} data
  * @memberof MapPage
  */
  addInfoMarker(markerImage, position, data) {
    let storeKey = data.category + "_" + data.color;
    if (!this.markerStore.hasOwnProperty(storeKey))
      this.markerStore[storeKey] = [];    

    let marker = this.addMarker(markerImage, position);
    this.markerStore.push(marker);
    marker.data = data;

    marker.addListener('click', () => {
      this.openMapEventInfo(marker.data);
    });

    this.markerStore[storeKey].push(marker);    
  }

/**
 * drawPath()
 *
 * Draws a line on the map from the startPos to the endPos with the desired color.
 *
 * @param {any} startPos The position to start routing from.
 * @param {any} endPos The position to route to.
 * @param {any} color The color of the line.
 * @memberof MapPage
 */
drawPath(startPos, endPos, color, lineData) {
    let request = {
      origin: startPos,
      destination: endPos,
      travelMode: 'DRIVING'
    }

    let directionService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setOptions({ suppressMarkers: true, preserveViewport: true });

    directionService.route(request, (result, status) => {
      this.renderDirection(result, color, lineData);
    });
  }

  /**
   * RenderDirection
   *
   * Responsible for rendering and hooking the polylines between the different events.
   *
   * @param {any} response The response from the directionService.route() call
   * @param {any} color The color of the road, e.g '#272E34'
   * @param {any} line The line object to draw
   * @memberof MapPage
   */
  renderDirection(response, color, lineData) {
    let polylineOptions = {
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 4
    };

    //Fullösning bör igentligen hanteras på serversidan (dvs om en väg mellan punkterna ej hittas)
    if (response == null || response == undefined)
      return;

    let polylines = [];
    for (let i = 0; i < polylines.length; i++)
      polylines[i].setMap(null);

    let legs = response.routes[0].legs;
    for (let i = 0; i < legs.length; i++) {
      let steps = legs[i].steps;

      for (let j = 0; j < steps.length; j++) {
        let nextSegment = steps[j].path;
        let stepPolyline = new google.maps.Polyline(polylineOptions);

        for (let k = 0; k < nextSegment.length; k++)
          stepPolyline.getPath().push(nextSegment[k]);

        stepPolyline.setMap(this.map);
        polylines.push(stepPolyline);
        google.maps.event.addListener(stepPolyline, 'click', (evt) => {
          this.openMapEventInfo(lineData);
        })
      }
    }
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
    this.addInfoMarker('./assets/imgs/' + color + '.png', pos, data);
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
