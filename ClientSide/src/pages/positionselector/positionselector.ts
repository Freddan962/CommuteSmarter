import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-positionselector',
  templateUrl: 'positionselector.html',
})
export class PositionselectorPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PositionselectorPage');
    this.initMap();
  }

  initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 59.329852,
        lng: 18.068461
      },
      zoom: 13,
      disableDefaultUI: true,
    });

    var marker = null;
  
    map.addListener('click', function(e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();

      if (marker) {
        console.log("Attempting to destroy marker");
        marker.setMap(null);
      }

      marker = new google.maps.Marker({
        map: map,
        draggable: false,
        position: {lat: lat, lng: lng}
      });
    });
  }
}
