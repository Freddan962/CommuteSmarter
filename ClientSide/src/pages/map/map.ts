import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  // Target the dom element
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  socialSharing: SocialSharing;
  displayMapEventCard: boolean;
  mapEventInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.displayMapEventCard = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.initMap();
  }

  initMap() {
    // Create a map object and specify the DOM element for display.
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 59.329852,
        lng: 18.068461
      },
      zoom: 13,
      disableDefaultUI: true,
      clickableIcons: false
    });
  }

  centerMapToLocation() {
    console.log('Called re center');
    this.map.setCenter();
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
    this.socialSharing.share('Subject ja','Message ja');
  }

  closeMapEventInfo() {
    console.log('Called close map event');
    this.displayMapEventCard = false;
  }
}
