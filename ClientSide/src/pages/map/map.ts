import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { WelcomePage } from './../welcome/welcome';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing) {
    this.displayMapEventCard = false;
    this.animateEventCard = 'reveal';
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
}
