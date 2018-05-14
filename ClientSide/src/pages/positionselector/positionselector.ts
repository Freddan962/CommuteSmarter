import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpService } from '../../app/services/httpService';

declare let google;
let locationMarker;
// let apiKey = 'AIzaSyAwKXMJki7n_K1eNUEw-h3wXfCh_S2o9Uo'  //google geolocation api (limited quota)
let apiKey = 'AIzaSyBAuhoPibIl4c0OlG_dmOiWKn-bY49X0Rs'

@IonicPage()
@Component({
  selector: 'page-positionselector',
  templateUrl: 'positionselector.html',
})


export class PositionselectorPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  nearbyPlace: any;
  markers: any[];
  locationMarker: any;
  positionOnMap: any;
  isenabled: boolean;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public geolocation: Geolocation,
    private httpService: HttpService,
    public loadingCtrl: LoadingController
    ) {
      this.markers = [];
      this.locationMarker;
    }

  ionViewDidLoad() {
    this.presentLoading()
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
    // let latLng = new google.maps.LatLng(59.326137, 18.071325);

    let mapOptions = {
      center: this.centerMapToLocation(),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      clickableIcons: false
    }


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.positionOnMap = this.centerMapToLocation();

    //Makes map clickable
    this.map.addListener('click', (e) => {
      this.placeMarkerAndPanTo(e.latLng, this.map);
    });
  }

  presentLoading() {
     this.loading = this.loadingCtrl.create({
      content: 'Loading map...'
    });
    this.loading.present();
  }
  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }



  placeMarkerAndPanTo(latLng, map) {
    this.removeMarkers();
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });
    console.log(latLng.lat() + latLng.lng()) 
    console.log(this.markers)
    this.markers.push(marker); //add current marker to markers array (so you can remove previous marker when setting a new)
    this.getLocationOfMarker();
    this.map.panTo(latLng) //centers map to marked location
    return marker
  }

  
  //removes previous marker when setting a new one
 removeMarkers() {
   for (let i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
}

  /**
    * centerMapToLocation()
    *
    * Prepares the center marker and centers the map on current geolocation.
    *
    * @memberof MapPage
    */
  centerMapToLocation() {
    let latLng;
    this.geolocation.getCurrentPosition().then
      ((position) => {
        latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
        this.locationMarker = this.placeMarkerAndPanTo(latLng, this.map.getCenter())
        this.locationMarker.setPosition(latLng);
      }, (err) => {
        console.log(err);
      }
    );
    return latLng;
  }

  getLocationOfMarker(){
    let geolocationRequest = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.markers[this.markers.length - 1].position.lat()},${this.markers[this.markers.length - 1].position.lng()}&key=${apiKey}`
  //google geolocation api request
  this.httpService.getDataFromExternal(geolocationRequest).subscribe(
    data => this.nearbyPlace = data.results[0].formatted_address,
    error => this.viewCtrl.dismiss('could not locate your position')
     /*console.error('Error: ' + error)*/,
      () => (console.log('Found: ' + this.nearbyPlace),
         this.isenabled = true,
         console.log(this.isenabled),
          this.dismissLoading()
          )
  );

}

   dismiss() {
    //  this.getLocationOfMarker() //waits for response from map api before exiting modal - Not the best solution but it works
     this.viewCtrl.dismiss({
       location: this.nearbyPlace,
       lat: this.markers[this.markers.length - 1].position.lat(),
       lng: this.markers[this.markers.length - 1].position.lng()
     })

    }
}
