import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpService } from '../../app/services/httpService';


declare var google;
var locationMarker;


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
    public geolocation: Geolocation,
    private httpService: HttpService) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PositionselectorPage');
    this.loadMap();
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
    
    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng, this.map);
    });
  }



  placeMarkerAndPanTo(latLng, map) {
   

      let testMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    let apiKey = 'AIzaSyAwKXMJki7n_K1eNUEw - h3wXfCh_S2o9Uo'

    let geolocationRequest = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${apiKey}`
    
    let nearbyPlace = this.httpService.getDataFromExternal(geolocationRequest);


    console.log("nearby: "+ nearbyPlace)

    map.panTo(latLng);
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

        if (locationMarker == null) {
          locationMarker = this.addMarker('https://cdn2.iconfinder.com/data/icons/map-location-geo-points/154/border-dot-point-128.png', this.map.getCenter());
        }

        locationMarker.setPosition(latLng);
      }, (err) => {
        console.log(err);
      }
    );
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

//   changeMarkerPosition(locationMarker) {
//     let latlng = new google.maps.LatLng(40.748774, -73.985763);
//     locationMarker.setPosition(latlng);
// }



   dismiss() {
     this.viewCtrl.dismiss(this.marker);
  }
}
