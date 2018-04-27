import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { filterMap } from '../filterMap/filterMap';
import { ChangeDetectorRef } from '@angular/core';  //https://stackoverflow.com/questions/40759808/angular-2-ngif-not-refreshing-when-variable-update-from-oberservable-subscrib
import { SocialSharing } from '@ionic-native/social-sharing';
import { WelcomePage } from './../welcome/welcome';

import { Geolocation } from '@ionic-native/geolocation';

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

  constructor(public navCtrl: NavController, public geolocation: Geolocation,
    private socialSharing: SocialSharing,
    private cdRef:ChangeDetectorRef) {
    this.displayMapEventCard = false;
    this.animateEventCard = 'reveal';

    this.colors = {
      'orange': '#ffa500',
      'red': '#ff0000',
      'blue': '#0000ff'
    }

    this.obstacles = [
      {
        type: 'line',
        start: new google.maps.LatLng(59.407433, 17.947650),
        end: new google.maps.LatLng(59.406676, 17.945710),
        color: this.colors['orange']
      },
      {
        type: 'line',
        start: new google.maps.LatLng(59.405539, 17.942470),
        end: new google.maps.LatLng(59.406084, 17.943790),
        color: this.colors['blue']
      },
      {
        type: 'icon',
        start: new google.maps.LatLng(59.405539, 17.942470),
        color: 'red',
        data: {
          title: 'Car Crash',
          time: 30,
          distance: 1.9,
          unit: 'km',
          text: 'Yes, this is a lot of text that serve as a placeholder... More of the text'
        }
      },
      {
        type: 'icon',
        start: new google.maps.LatLng(59.408429, 17.944525),
        color: 'blue',
        data: {
          title: 'Obstacle',
          time: 128,
          distance: 41,
          unit: 'km',
          text: 'Yes, this is a lot of text that serve as a placeholder... More of the text'
        }
      },
      {
        type: 'icon',
        start: new google.maps.LatLng(59.408559, 17.940394),
        color: 'yellow',
        data: {
          title: 'Something illegal',
          time: 12,
          distance: 2.3,
          unit: 'km',
          text: 'Yes, this is a lot of text that serve as a placeholder... More of the text'
        }
      }
    ]
  }

  ionViewDidLoad() {
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
      disableDefaultUI: true
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
      switch (obstacle.type) {
        case 'icon':
          this.drawIcon(obstacle.start, obstacle.color, obstacle.data);
          break;
          case 'line':
          this.drawPath(obstacle.start, obstacle.end, obstacle.color);
          break;
        default:
          break;
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
    if(locationMarker == null) {
      locationMarker = this.addMarker('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.map.getCenter());
    }

    this.geolocation.getCurrentPosition().then
      ((position) => {
        let latLng = new google.maps.LatLng
          (position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
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
drawPath(startPos, endPos, color) {
    let request = {
      origin: startPos,
      destination: endPos,
      travelMode: 'DRIVING'
    }

    let directionService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    let polyLineOptions = { strokeColor: color }
    directionsDisplay.setMap(this.map);
    directionsDisplay.setOptions({ suppressMarkers: true, preserveViewport: true, polylineOptions: polyLineOptions });

    directionService.route(request, function(result, status) {
      directionsDisplay.setDirections(result);
    });
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
}
