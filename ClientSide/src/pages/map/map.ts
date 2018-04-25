import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { filterMap } from '../filterMap/filterMap';

import { SocialSharing } from '@ionic-native/social-sharing';
import { WelcomePage } from './../welcome/welcome';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

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

  constructor(public navCtrl: NavController, public geolocation: Geolocation,
    private socialSharing: SocialSharing) {
    this.displayMapEventCard = false;
    this.animateEventCard = 'reveal';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }

  loadMap() {
	this.geolocation.getCurrentPosition().then
	((position) => {
		let latLng = new google.maps.LatLng
		(position.coords.latitude, position.coords.longitude);
		
		let mapOptions = {
			center: latLng,
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		}
		
		this.map = new google.maps.Map
		(this.mapElement.nativeElement, mapOptions);
		this.addMarker();
	}, (err) => {
		console.log(err);
	});
  }  
  onClicked(){
    this.navCtrl.push(filterMap);
  }
  openMapEventInfo() {
    console.log('Called open map event info');
    this.mapEventInfo = {
      title: 'Car Crash',
      time: 30,
      distance: 1.9,
      unit: 'km',
      text: 'Yes, this is a lot of text that serve as a placeholder... More of the text'
    }

    this.displayMapEventCard = true;
  }

  shareEvent() {
    console.log("called share event");

    this.socialSharing.share(this.mapEventInfo.title, this.mapEventInfo.text, null, null);
  }

  closeMapEventInfo() {
    console.log('Called close map event');
    this.animateEventCard = 'fadeAway';

    setTimeout(()=> {
      this.displayMapEventCard = false;
      this.animateEventCard = 'reveal';
    }, 1000);
  }
  
   addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";         
 
  this.addInfoWindow(marker, content);
 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
}
