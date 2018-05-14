import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { filterMap } from '../filterMap/filterMap';
import { ChangeDetectorRef } from '@angular/core';  //https://stackoverflow.com/questions/40759808/angular-2-ngif-not-refreshing-when-variable-update-from-oberservable-subscrib
import { SocialSharing } from '@ionic-native/social-sharing';
import { WelcomePage } from './../welcome/welcome';
import moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';
import { EventService } from './../../app/services/eventService';
import { TranslateService } from '@ngx-translate/core';

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
  obstacles: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private socialSharing: SocialSharing,
    private cdRef: ChangeDetectorRef,
    private eventService: EventService,
    private translate: TranslateService
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

  refreshEvents() {
    this.obstacles = this.eventService.getEvents(); //Fetches from the database
    console.log('Server responded with:')
    console.log(this.obstacles)
  }

  ionViewDidLoad() {
    this.refreshEvents();
    this.loadMap();
    this.renderObstacles();
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
    this.obstacles.subscribe(data => {
      data.forEach(obstacle => {
        let type = obstacle.type;

        if(type === undefined) {
          type = '';
        }

        switch (type) {
            case 'line':
              this.drawPath(obstacle.start, obstacle.end, obstacle.color, obstacle);
            break;
            case 'icon':
          default:
              this.drawIcon(new google.maps.LatLng(obstacle.lat, obstacle.long), obstacle.color, obstacle);
            break;
        }
      });
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
        if(locationMarker == null) {
          locationMarker = this.addMarker('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.map.getCenter());
        }
        locationMarker.setPosition(latLng);
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
  * Callback function fopr the shareEvent button on the map.
  *
  * @memberof MapPage
  */
  shareEvent() {
    this.socialSharing.share(this.mapEventInfo.title, this.mapEventInfo.text, null, null);
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
      animation: google.maps.Animation.DROP,
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
    let marker = this.addMarker(markerImage, position);
    marker.data = data;

    marker.addListener('click', () => {
      this.openMapEventInfo(marker.data);
    });
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
drawPath(startPos, endPos, color, line) {
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
      this.renderDirection(result, color, line);
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
  renderDirection(response, color, line) {
    let polylineOptions = {
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 4
    };

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
          this.openMapEventInfo(line.data);
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
   * Calculate the distance to a event from current location.
   */
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
}
