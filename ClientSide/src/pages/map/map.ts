import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { filterMap } from '../filterMap/filterMap';

import { SocialSharing } from '@ionic-native/social-sharing';
import { WelcomePage } from './../welcome/welcome';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;
var marker;

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
    private socialSharing: SocialSharing) {
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
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    this.renderObstacles();
  }

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

  centerMapToLocation() {
    if(marker == null) this.addMarker
      ('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.map.getCenter());
    this.geolocation.getCurrentPosition().then
      ((position) => {
        let latLng = new google.maps.LatLng
          (position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
        marker.setPosition(latLng);
      }, (err) => {
        console.log(err);
      });
	}
  
  openMapEventInfo(data) {
    console.log("Open map event info with data: " + data);
    this.mapEventInfo = data; 
    this.displayMapEventCard = true;
  }

  shareEvent() {
    console.log("called share event");

    this.socialSharing.share(this.mapEventInfo.title, this.mapEventInfo.text, null, null);
  }

  closeMapEventInfo() {
    console.log('Called close map event');
    this.animateEventCard = 'fadeAway';

    setTimeout(() => {
      this.displayMapEventCard = false;
      this.animateEventCard = 'reveal';
    }, 1000);
  }
  
  addMarker(markerImage, position) {
    
    marker = new google.maps.Marker({
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

  addInfoMarker(markerImage, position, data) {
    marker = this.addMarker(markerImage, position);
    marker.data = data;

    marker.addListener('click', () => {
      console.log("Clicked on this marker");
      this.openMapEventInfo(marker.data);
    });
  }

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

  drawIcon(startPos, color, data) {
    this.addInfoMarker('./assets/imgs/' + color + '.png', startPos, data);
  }
}
