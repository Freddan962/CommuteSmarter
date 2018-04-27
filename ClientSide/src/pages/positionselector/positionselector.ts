import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
let google;

@IonicPage()
@Component({
  selector: 'page-positionselector',
  templateUrl: 'positionselector.html',
})
export class PositionselectorPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PositionselectorPage');
    this.loadMap()
  }

  loadMap(){
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 59.329852,
        lng: 18.068461
      },
      zoom: 13,
      disableDefaultUI: true,
    });

    //TODO: Set this to whatever is the current location
     this.marker = null; 
    
    map.addListener('click', function(e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();

      if (this.marker) 
        this.marker.setMap(null);
      
      this.marker = new google.maps.Marker({
        map: map,
        draggable: false,
        position: {lat: lat, lng: lng}
      });
      console.log(this.marker.position.lat)
    });
  }


  centerMapToLocation() {
    if (this.marker == null) this.addMarker
      ('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.map.getCenter());
    this.geolocation.getCurrentPosition().then
      ((position) => {
        let latLng = new google.maps.LatLng
          (position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
        this.marker.setPosition(latLng);
      }, (err) => {
        console.log(err);
      });
  }

  addMarker(markerImage, position) {

    this.marker = new google.maps.Marker({
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
  }



   dismiss() {
     this.viewCtrl.dismiss(this.marker);
  }
}
